import Head from 'next/head'
import Header from '@/components/Header'
import { Flex, Text, Button, Spinner, useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Tooltip,
  Heading,
  Divider,
  Stack,
  Box,
  Alert,
  Link,
  Stat,
  StatArrow,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardBody,
  SimpleGrid
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FaArrowDown, FaArrowRight } from 'react-icons/fa'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { AiOutlineReload } from 'react-icons/ai'
import { FaCalendar } from 'react-icons/fa'
import { supabase } from '@/components/utils/supabase'
import { useRouter } from 'next/router'
import { FiExternalLink } from 'react-icons/fi'
import Footer from '@/components/Footer'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTT, ResponsiveContainer } from 'recharts';
import { MdShoppingCartCheckout } from 'react-icons/md'

export default function Dashboard() {

  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    (async () => { 
      if (!(await supabase.auth.getSession()).data.session) {
        const id = 'redir-toast'
        if (!toast.isActive(id)) {
          toast({
            id,
            title: "Redirecting...",
            description: "Sign in to view your dashboard.",
            status: "warning",
            position: "top-end",
            duration: 7500,
            isClosable: true,
          })
        }
        router.push('/sign-in')
      }
    })();
  }, [])

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(new Date(new Date().setHours(0,0,0,0)).getTime()-(86400000*7)),
      endDate: new Date(new Date().setHours(0,0,0,0)),
      key: 'selection'
    }
  ]);

  const [user, setUser] = useState({})   
  const [userType, setUserType] = useState("")   
  const [businessID, setBusinessID] = useState("")  
  const [stats, setStats] = useState([]) 
  const [statsLoading, setStatsLoading] = useState(true)
  const [sendingEnabled, setSendingEnabled] = useState(false)
  
  const [graphMrr, setGraphMrr] = useState([]) 
  const [graphArr, setGraphArr] = useState([])
  const [graphSub, setGraphSub] = useState([])  

  useEffect(() => {
    (async () => { 
      const { data: { user } } = await supabase.auth.getUser()
      setUserType(user.user_metadata.type)
      setUser(user)
      setStatsLoading(true)

      if (user.user_metadata.businesses) {
        setBusinessID(user.user_metadata.businesses[0] ?? null)
        const response = await fetch("https://churnaxe.com/stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ acct_id:user.user_metadata.businesses[0],uid:user.id,start:dateRange[0].startDate.getTime(),end:dateRange[0].endDate.getTime() }),
        });

        const result = await response.json();
        setStats(result)
        setSendingEnabled(user.user_metadata.sendingSettings==undefined?false:user.user_metadata.sendingSettings.sending)

        let mgraph = []
        result.stats.forEach(day => {
          mgraph.push({date: new Date(day.date*1000).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"2-digit" }), val: parseInt(day.mrr)})
        });
        setGraphMrr(mgraph)
  
        let agraph = []
        result.stats.forEach(day => {
          agraph.push({date: new Date(day.date*1000).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"2-digit" }), val: parseInt(day.arr)})
        });
        setGraphArr(agraph)
  
        let sgraph = []
        result.stats.forEach(day => {
          sgraph.push({date: new Date(day.date*1000).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"2-digit" }), val: parseInt(day.subscribers)})
        });
        setGraphSub(sgraph)

        setStatsLoading(false)
      }
    })();
  }, [])

  const [preRun, setPreRun] = useState(false)  

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const queryParameters = new URLSearchParams(window.location.search)
      const code = queryParameters.get("code")

      if (code && !preRun && (user.user_metadata.businesses)==undefined) {
        setPreRun(true)
        const { data: { user } } = await supabase.auth.getUser()
        const response = await fetch("https://churnaxe.com/add-business", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code:code,uid:user.id }),
        });

        const result = await response.text();
        queryParameters.delete("code")
        queryParameters.delete("scope")
        setBusinessID(result)
      }
    })();
  }, [])

  const refreshStats = async (selecA, selecB) => {
    const { data: { user } } = await supabase.auth.getUser()
    setStatsLoading(true)

    if (user.user_metadata.businesses) {
      setBusinessID(user.user_metadata.businesses[0] ?? null)
      const response = await fetch("https://churnaxe.com/stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ acct_id:user.user_metadata.businesses[0],uid:user.id,start:selecB?selecB:dateRange[0].startDate.getTime(),end:selecA?selecA:dateRange[0].endDate.getTime() }),
      });

      const result = await response.json();
      setStats(result)
      setSendingEnabled(user.user_metadata.sendingSettings==undefined?false:user.user_metadata.sendingSettings.sending)

      let mgraph = []
      result.stats.forEach(day => {
        mgraph.push({date: new Date(day.date*1000).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"2-digit" }), val: parseInt(day.mrr)})
      });
      setGraphMrr(mgraph)

      let agraph = []
      result.stats.forEach(day => {
        agraph.push({date: new Date(day.date*1000).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"2-digit" }), val: parseInt(day.arr)})
      });
      setGraphArr(agraph)

      let sgraph = []
      result.stats.forEach(day => {
        sgraph.push({date: new Date(day.date*1000).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"2-digit" }), val: parseInt(day.subscribers)})
      });
      setGraphSub(sgraph)
      
      setStatsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <link rel="canonical" href="https://churnaxe.com/dashboard" />

        <title>Dashboard - ChurnAxe</title>
        <meta name="description" content="Track your statistics, choose how to reduce your churn, and manage what your customers see on a daily basis." />

        <meta name="twitter:title" content="Dashboard - ChurnAxe" />
        <meta name="twitter:description" content="Track your statistics, choose how to reduce your churn, and manage what your customers see on a daily basis." />
        <meta name="twitter:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://churnaxe.com/dashboard`}/>

        <meta property="og:title" content="Dashboard - ChurnAxe" />
        <meta property="og:description" content="Track your statistics, choose how to reduce your churn, and manage what your customers see on a daily basis." />
        <meta property="og:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta property="og:url" content={`https://churnaxe.com/dashboard`}/>

        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-image-preview:large" />

        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white-translucent" />

        <link rel="apple-touch-icon" sizes="180x180" href="https://churnaxe.com/s/i/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <link rel="manifest" href="https://churnaxe.com/s/i/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        <meta property="og:locale" content="en_US"/>
        <meta charSet="utf-8"/>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"/>

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9ZBWR1SD0H"></script>
        <script dangerouslySetInnerHTML={{
            __html:`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
        
            gtag('config', 'G-9ZBWR1SD0H');`
        }} /> 

        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>
      <Header />
      <Flex as="main" mx="auto" mt={6} px={5}>
        <Flex flexDirection={"column"} w={"100%"} minHeight="100vh" mx="auto" maxWidth={"1000px"}>
        {userType === "subscribed" ? <><Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          pt={0}
          mx={"auto"}
          textAlign="center"
          direction={{ base: 'column', md: 'row' }}>
          <Stack flex={1} spacing={{ base: 4 }}>
            <Alert textAlign={"left"} borderRadius={7.5} p={6} width={"100%!important"} backgroundColor={"#f8f8f8"} border={"1px solid"} borderColor={"gray.200"}>
              <Flex alignItems={"center"}>
                <Flex maxWidth={1000} flex={1} mr={5} flexDirection={"column"}>
                  <Heading fontWeight={400} fontSize={"larger"} fontFamily={"'Montserrat', sans-serif!important"}>{businessID ? (<span>Dashboard for <strong>{stats.name}</strong></span>) : `Add a Business`}</Heading>
                  <Text mt={3}>{businessID ? `Track your statistics, choose how to reduce your churn, and manage what your customers see on a daily basis.` : `Add a business to ChurnAxe to start tracking your statistics, reducing your churn, and manage what your customers see on a daily basis.`}</Text>
                </Flex>
                <Link href={businessID ? '#Stats' : '#Add'}><Button flex={2} textWrap={"wrap"} maxWidth={120} colorScheme={"blue"} backgroundColor={"#3182CE"} color={"#FFFFFF"} rightIcon={<FaArrowDown />}>{businessID ? 'Stats' : 'Add'}</Button></Link>
              </Flex>
            </Alert>
          </Stack>
        </Stack>
        <Divider borderColor={"#4A5568"} opacity={0.3} id='Stats' mb={6} mt={4} />
        <Flex width={"100%"} flexDirection={{base:"column",sm:"row"}} justifyContent={"flex-end"} alignItems={"center"}>
            <Button onClick={refreshStats} color={"inherit"} colorScheme={"grey"} maxWidth={350} borderColor={"gray.200"} mb={{ base:2, md:0 }} leftIcon={<AiOutlineReload fontWeight={800} />} mr={{base:0,sm:2}} size="md" variant={"outline"}>
              Refresh Stats
            </Button>
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button color={"inherit"} colorScheme={"grey"} maxWidth={350} borderColor={"gray.200"} mb={{ base:2, md:0 }} leftIcon={<FaCalendar />} size="md" variant={"outline"}>
              {dateRange[0].startDate.toDateString().split(' ').slice(1).join(' ')} - {dateRange[0].endDate.toDateString().split(' ').slice(1).join(' ')}
              </Button>
            </PopoverTrigger>
            <PopoverContent p={0} boxSize={"fit-content"} backgroundColor={"#fafafa"}>
              <PopoverArrow backgroundColor={"#fafafa"} />
              <PopoverBody p={0}>
                <DateRangePicker
                  editableDateInputs={true}
                  onChange={(item) => {
                    setDateRange([item.selection])
                    refreshStats(new Date(new Date(new Date(item.selection.endDate).setHours(0,0,0,0))).getTime(), new Date(new Date(new Date(item.selection.startDate).setHours(0,0,0,0))).getTime())
                  }}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  maxDate={new Date()}
                  ranges={dateRange}
                  staticRanges={[{
                    label: "Last 7 Days",
                    range: () => ({
                      startDate: new Date(new Date(new Date().setHours(0,0,0,0)).getTime()-(86400000*7)),
                      endDate: new Date(new Date(new Date().setHours(0,0,0,0)).getTime())
                    }),
                    isSelected(range) {
                      const definedRange = this.range();
                      return (
                        new Date(new Date(range.startDate).setHours(0,0,0,0)).getTime() == new Date(new Date(definedRange.startDate).setHours(0,0,0,0)).getTime() && new Date(new Date(range.endDate).setHours(0,0,0,0)).getTime() == new Date(new Date(definedRange.endDate).setHours(0,0,0,0)).getTime()
                      );
                    }
                  },
                  {
                    label: "Last 30 Days",
                    range: () => ({
                      startDate: new Date(new Date(new Date().setHours(0,0,0,0)).getTime()-(86400000*30)),
                      endDate: new Date(new Date(new Date().setHours(0,0,0,0)).getTime())
                    }),
                    isSelected(range) {
                      const definedRange = this.range();
                      return (
                        new Date(new Date(range.startDate).setHours(0,0,0,0)).getTime() == new Date(new Date(definedRange.startDate).setHours(0,0,0,0)).getTime() && new Date(new Date(range.endDate).setHours(0,0,0,0)).getTime() == new Date(new Date(definedRange.endDate).setHours(0,0,0,0)).getTime()
                      );
                    }
                  },
                  {
                    label: "Last 60 Days",
                    range: () => ({
                      startDate: new Date(new Date(new Date().setHours(0,0,0,0)).getTime()-(86400000*60)),
                      endDate: new Date(new Date(new Date().setHours(0,0,0,0)).getTime())
                    }),
                    isSelected(range) {
                      const definedRange = this.range();
                      return (
                        new Date(new Date(range.startDate).setHours(0,0,0,0)).getTime() == new Date(new Date(definedRange.startDate).setHours(0,0,0,0)).getTime() && new Date(new Date(range.endDate).setHours(0,0,0,0)).getTime() == new Date(new Date(definedRange.endDate).setHours(0,0,0,0)).getTime()
                      );
                    }
                  },
                  {
                    label: "Last 90 Days",
                    range: () => ({
                      startDate: new Date(new Date(new Date().setHours(0,0,0,0)).getTime()-(86400000*90)),
                      endDate: new Date(new Date(new Date().setHours(0,0,0,0)).getTime())
                    }),
                    isSelected(range) {
                      const definedRange = this.range();
                      return (
                        new Date(new Date(range.startDate).setHours(0,0,0,0)).getTime() == new Date(new Date(definedRange.startDate).setHours(0,0,0,0)).getTime() && new Date(new Date(range.endDate).setHours(0,0,0,0)).getTime() == new Date(new Date(definedRange.endDate).setHours(0,0,0,0)).getTime()
                      );
                    }
                  }]}
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
        {!sendingEnabled&&businessID?<Alert mt={5} textAlign={"left"} borderRadius={7.5} p={6} width={"100%!important"} status='warning'>
          <Flex alignItems={"center"}>
            <Flex maxWidth={1000} flex={1} mr={5} flexDirection={"column"}>
              <Heading fontWeight={400} fontSize={"larger"} fontFamily={"'Montserrat', sans-serif!important"}><span>Email Sending is <strong>Disabled</strong></span></Heading>
              <Text lineHeight={1.7} mt={3}>You are not currently sending recovery emails to churned subscribers. To enable sending, and modify other settings, <strong>go to the email settings page</strong>.</Text>
            </Flex>
            <Link href={"/settings"}><Button textWrap={"wrap"} backgroundColor={"#FFFFFF"} maxWidth={120} color={"inherit"} colorScheme={"grey"} borderColor={"gray.200"} rightIcon={<FaArrowRight fontWeight={800} />} size="md" variant={"outline"}>Edit</Button></Link>
          </Flex>
        </Alert>:null}
        {businessID ? !statsLoading ? <><SimpleGrid mt={5} columns={{sm: 2, md: 3, lg:4}} spacing={{base:3, sm:2,md:3}}>
          <Card overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex alignItems={"center"} height={"100%"}>
                <Stat>
                  <StatLabel>Monthly Recurring Revenue</StatLabel>
                  <StatNumber my={2} fontSize={"3xl"}>${parseInt(stats.mrr).toLocaleString()}</StatNumber>
                  <StatHelpText>
                  on {new Date(dateRange[0].endDate).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"numeric" })}
                  </StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          <Card overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex alignItems={"center"} height={"100%"}>
                <Stat>
                  <StatLabel>Annual Recurring Revenue</StatLabel>
                  <StatNumber my={2} fontSize={"3xl"}>${parseInt(stats.arr).toLocaleString()}</StatNumber>
                  <StatHelpText>
                    on {new Date(dateRange[0].endDate).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"numeric" })}
                  </StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          <Card overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex alignItems={"center"} height={"100%"}>
                <Stat>
                  <StatLabel>Active Subscribers</StatLabel>
                  <StatNumber my={2} fontSize={"3xl"}>{stats.active}</StatNumber>
                  <StatHelpText>
                    on {new Date(dateRange[0].endDate).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"numeric" })}
                  </StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          <Card overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
          <CardBody>
            <Flex alignItems={"center"} height={"100%"}>
              <Stat>
                <StatLabel>Churn Rate</StatLabel>
                <StatNumber my={2} fontSize={"3xl"}>{stats.churn?parseInt(stats.churn).toLocaleString():"0"}%</StatNumber>
                <StatHelpText>
                    {new Date(dateRange[0].startDate).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"numeric" })}&nbsp;to&nbsp;{new Date(dateRange[0].endDate).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"numeric" })}
                </StatHelpText>
              </Stat>
            </Flex>
          </CardBody>
        </Card>
        </SimpleGrid>
        <Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex flexDirection={"column"} alignItems={"start"} height={"100%"}>
                <Stat>
                  <StatLabel>Monthly Recurring Revenue</StatLabel>
                  <StatNumber my={2} fontSize={"3xl"}>${parseInt(stats.mrr).toLocaleString()}</StatNumber>
                  <StatHelpText>
                      {new Date(dateRange[0].startDate).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"numeric" })}&nbsp;to&nbsp;{new Date(dateRange[0].endDate).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"numeric" })}
                  </StatHelpText>
                </Stat>
                <div style={{ width: '100%', height: 250, marginTop:"1.5rem" }}>
                  <ResponsiveContainer>
                    <AreaChart
                      data={graphMrr}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid opacity={0.3} vertical={false} />
                      <XAxis opacity={0.7} dataKey="date" interval={"equidistantPreserveStart"}  />
                      <YAxis tickFormatter={(value) => new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short"}).format(value)} opacity={0.7} dataKey="val" for />
                      <RTT formatter={(value, name, props) => [`$${value.toLocaleString()}`, "MRR"]} />
                      <Area type="monotone" dataKey="val" stroke="#076dcd" fill="#3182CE" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Flex>
            </CardBody>
          </Card>
          <Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex flexDirection={"column"} alignItems={"start"} height={"100%"}>
                <Stat>
                  <StatLabel>Annual Recurring Revenue</StatLabel>
                  <StatNumber my={2} fontSize={"3xl"}>${parseInt(stats.arr).toLocaleString()}</StatNumber>
                  <StatHelpText>
                      {new Date(dateRange[0].startDate).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"numeric" })}&nbsp;to&nbsp;{new Date(dateRange[0].endDate).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"numeric" })}
                  </StatHelpText>
                </Stat>
                <div style={{ width: '100%', height: 250, marginTop:"1.5rem" }}>
                  <ResponsiveContainer>
                    <AreaChart
                      data={graphArr}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid opacity={0.3} vertical={false} />
                      <XAxis opacity={0.7} dataKey="date" interval={"equidistantPreserveStart"} />
                      <YAxis tickFormatter={(value) => new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short"}).format(value)} opacity={0.7} dataKey="val" for />
                      <RTT formatter={(value, name, props) => [`$${value.toLocaleString()}`, "ARR"]} />
                      <Area type="monotone" dataKey="val" stroke="#076dcd" fill="#3182CE" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Flex>
            </CardBody>
          </Card>
          <Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex flexDirection={"column"} alignItems={"start"} height={"100%"}>
                <Stat>
                  <StatLabel>Active Subscribers</StatLabel>
                  <StatNumber my={2} fontSize={"3xl"}>{stats.active}</StatNumber>
                  <StatHelpText>
                      {new Date(dateRange[0].startDate).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"numeric" })}&nbsp;to&nbsp;{new Date(dateRange[0].endDate).toLocaleDateString('en-us', { day:"2-digit", month:"short", year:"numeric" })}
                  </StatHelpText>
                </Stat>
                <div style={{ width: '100%', height: 250, marginTop:"1.5rem" }}>
                  <ResponsiveContainer>
                    <AreaChart
                      data={graphSub}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid opacity={0.3} vertical={false} />
                      <XAxis opacity={0.7} dataKey="date" interval={"equidistantPreserveStart"}  />
                      <YAxis tickFormatter={(value) => new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short"}).format(value)} opacity={0.7} dataKey="val" for />
                      <RTT formatter={(value, name, props) => [`${value.toLocaleString()}`, "Subscibers"]} />
                      <Area type="monotone" dataKey="val" stroke="#076dcd" fill="#3182CE" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Flex>
            </CardBody>
          </Card>
          </>
          
          :

          <Flex w={"100%"} mt={12} justifyContent={"center"}><Spinner /></Flex>
          
          : 
          
          
          <><Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex flexDirection={"column"} justifyContent={"center"} height={"100%"}>
                <Heading fontWeight={600} fontSize={"larger"} fontFamily={"'Montserrat', sans-serif!important"}>Connect business</Heading>
                <Text mt={4}>Connect your business&apos; Stripe account to ChurnAxe to begin <strong>tracking statistics</strong>, <strong>reducing churn</strong>, and <strong>managing your customers</strong>.</Text>
                <Link target='_blank' href={`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_P0VQbJAmyBtcGM4v66GGK7HhstydM564&scope=read_write&redirect_uri=https://churnaxe.com/dashboard
`}><Button textWrap={"wrap"} mt={5} maxWidth={175} colorScheme={"blue"} backgroundColor={"#3182CE"} color={"#FFFFFF"} rightIcon={<FiExternalLink fontWeight={600} />}>Connect Stripe</Button></Link>
              </Flex>
            </CardBody>
          </Card>
          <Box pointerEvents={"none"} filter={"blur(4px)"}>
            <SimpleGrid columns={{sm: 2, md: 3, lg:4}} spacing={{sm:2,md:3}}>
            <Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme= {"grey"} variant='outline'>
              <CardBody>
                <Flex alignItems={"center"} height={"100%"}>
                  <Stat>
                    <StatLabel>Monthly Recurring Revenue</StatLabel>
                    <StatNumber fontSize={"3xl"}>$12,231</StatNumber>
                    <StatHelpText>
                      <StatArrow type='increase' />
                      23.36%
                    </StatHelpText>
                  </Stat>
                </Flex>
              </CardBody>
            </Card>
            <Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme= {"grey"} variant='outline'>
              <CardBody>
                <Flex alignItems={"center"} height={"100%"}>
                  <Stat>
                    <StatLabel>Annual Recurring Revenue</StatLabel>
                    <StatNumber fontSize={"3xl"}>$138,928</StatNumber>
                    <StatHelpText>
                      <StatArrow type='increase' />
                      6%
                    </StatHelpText>
                  </Stat>
                </Flex>
              </CardBody>
            </Card>
            <Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme= {"grey"} variant='outline'>
              <CardBody>
                <Flex alignItems={"center"} height={"100%"}>
                  <Stat>
                    <StatLabel>Active Subscribers</StatLabel>
                    <StatNumber fontSize={"3xl"}>77</StatNumber>
                    <StatHelpText>
                      <StatArrow type='increase' />
                      7%
                    </StatHelpText>
                  </Stat>
                </Flex>
              </CardBody>
            </Card>
            <Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme= {"grey"} variant='outline'>
            <CardBody>
              <Flex alignItems={"center"} height={"100%"}>
                <Stat>
                  <StatLabel>Churn Rate</StatLabel>
                  <StatNumber fontSize={"3xl"}>8.9%</StatNumber>
                  <StatHelpText>
                    <StatArrow type='decrease' />
                    21%
                  </StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          </SimpleGrid><Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex flexDirection={"column"} alignItems={"start"} height={"100%"}>
                <Stat>
                  <StatLabel>Monthly Recurring Revenue</StatLabel>
                  <StatNumber fontSize={"3xl"}>$12,231</StatNumber>
                  <StatHelpText>
                    <StatArrow type='increase' />
                    6%
                  </StatHelpText>
                </Stat>
                <div style={{ width: '100%', height: 250, marginTop:"1.5rem" }}>
                  <ResponsiveContainer>
                    <AreaChart
                      data={[
                        {
                            "date": "Nov 18, 23",
                            "val": 9002
                        },
                        {
                            "date": "Nov 19, 23",
                            "val": 9723
                        },
                        {
                            "date": "Nov 20, 23",
                            "val": 9993
                        },
                        {
                            "date": "Nov 21, 23",
                            "val": 10411
                        },
                        {
                            "date": "Nov 22, 23",
                            "val": 11023
                        },
                        {
                            "date": "Nov 23, 23",
                            "val": 12334
                        },
                        {
                            "date": "Nov 24, 23",
                            "val": 12231
                        }
                    ]}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid opacity={0.3} vertical={false} />
                      <XAxis opacity={0.7} dataKey="date" interval={"equidistantPreserveStart"}  />
                      <YAxis tickFormatter={(value) => new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short"}).format(value)} opacity={0.7} dataKey="val" for />
                      <RTT formatter={(value, name, props) => [`$${value.toLocaleString()}`, "MRR"]} />
                      <Area type="monotone" dataKey="val" stroke="#076dcd" fill="#3182CE" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Flex>
            </CardBody>
          </Card>
          <Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex flexDirection={"column"} alignItems={"start"} height={"100%"}>
                <Stat>
                  <StatLabel>Annual Recurring Revenue</StatLabel>
                  <StatNumber fontSize={"3xl"}>$138,928</StatNumber>
                  <StatHelpText>
                    <StatArrow type='increase' />
                    6%
                  </StatHelpText>
                </Stat>
                <div style={{ width: '100%', height: 250, marginTop:"1.5rem" }}>
                  <ResponsiveContainer>
                    <AreaChart
                      data={[
                        {
                            "date": "Nov 18, 23",
                            "val": 95034
                        },
                        {
                            "date": "Nov 19, 23",
                            "val": 84523
                        },
                        {
                            "date": "Nov 20, 23",
                            "val": 99342
                        },
                        {
                            "date": "Nov 21, 23",
                            "val": 100324
                        },
                        {
                            "date": "Nov 22, 23",
                            "val": 114442
                        },
                        {
                            "date": "Nov 23, 23",
                            "val": 129162
                        },
                        {
                            "date": "Nov 24, 23",
                            "val": 138928
                        }
                    ]}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid opacity={0.3} vertical={false} />
                      <XAxis opacity={0.7} dataKey="date" interval={"equidistantPreserveStart"}  />
                      <YAxis tickFormatter={(value) => new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short"}).format(value)} opacity={0.7} dataKey="val" for />
                      <RTT formatter={(value, name, props) => [`$${value.toLocaleString()}`, "ARR"]} />
                      <Area type="monotone" dataKey="val" stroke="#076dcd" fill="#3182CE" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Flex>
            </CardBody>
          </Card>
          </Box>
          </>}</> : 
          
          <>
          <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          pt={15}
          mx={"auto"}
          maxWidth={750}
          textAlign="center"
          direction={{ base: 'column', md: 'row' }}>
          <Stack flex={1} spacing={{ base: 4 }}>
            <Heading
              lineHeight={1.35}
              fontWeight={600}
              fontSize={{ base: '4xl', sm: '5xl', lg: '6xl' }}>
              <Text fontFamily={"'Montserrat', sans-serif!important"} as={'span'}       
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.100',
                zIndex: -1,
              }}>
                Reduce Churn,
              </Text>
              <br />
              <Text
                fontFamily={"'Montserrat', sans-serif!important"}
                as={'span'} color={'blue.300'}>
                Automatically.
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={"lg"}
            fontFamily={"'Montserrat', sans-serif!important"}>
              Start <strong>tracking your statistics</strong>, <strong>reducing your churn</strong>, and <strong>managing what your customers see</strong> on a daily basis. ChurnAxe makes recovering churned customers easy and automatic, creating a simple way to improve your MRR. 
            </Text>
            <Stack
              mt={"2!important"}
              mb={"0!important"}
              justifyContent="center"
              spacing={{ base: 4, sm: 3 }}
              direction={{ base: 'column', sm: 'row' }}>
              {userType === "subscribed" ? null : 
              <form target="_blank" action="https://churnaxe.com/checkout" method="POST">
              <input type="hidden" name="userEmail" value={user.email} />
              <input type="hidden" name="userId" value={user.id} />
              <Tooltip textAlign={"center"} p={2} borderRadius={"md"} backgroundColor={"gray.700"} color={"white"} label='Subscribe to ChurnAxe to get started.'><Button
              rounded={'lg'}
              size={"lg"}
              fontWeight={'normal'}
              px={6}
              mb={2}
              variant={"solid"}
              type="submit"
              fontFamily={"'Montserrat', sans-serif!important"}
              colorScheme='blue'
              bg={'blue.500'}
              fontSize={"large"}
              py={5}
              color={'white'}
              minWidth={200}
              rightIcon={<MdShoppingCartCheckout size={20} />}
              _hover={{ bg: 'blue.500' }}>
              Join Now
              </Button></Tooltip>
            </form>}
            </Stack>
          </Stack>
        </Stack>
          <Divider borderColor={"#4A5568"} opacity={0.3} id='Stats' mb={6} mt={6} />
          <Box pointerEvents={"none"} filter={"blur(4px)"}>
            <SimpleGrid columns={{sm: 2, md: 3, lg:4}} spacing={{sm:2,md:3}}>
            <Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme= {"grey"} variant='outline'>
              <CardBody>
                <Flex alignItems={"center"} height={"100%"}>
                  <Stat>
                    <StatLabel>Monthly Recurring Revenue</StatLabel>
                    <StatNumber fontSize={"3xl"}>$12,231</StatNumber>
                    <StatHelpText>
                      <StatArrow type='increase' />
                      23.36%
                    </StatHelpText>
                  </Stat>
                </Flex>
              </CardBody>
            </Card>
            <Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme= {"grey"} variant='outline'>
              <CardBody>
                <Flex alignItems={"center"} height={"100%"}>
                  <Stat>
                    <StatLabel>Annual Recurring Revenue</StatLabel>
                    <StatNumber fontSize={"3xl"}>$138,928</StatNumber>
                    <StatHelpText>
                      <StatArrow type='increase' />
                      6%
                    </StatHelpText>
                  </Stat>
                </Flex>
              </CardBody>
            </Card>
            <Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme= {"grey"} variant='outline'>
              <CardBody>
                <Flex alignItems={"center"} height={"100%"}>
                  <Stat>
                    <StatLabel>Active Subscribers</StatLabel>
                    <StatNumber fontSize={"3xl"}>77</StatNumber>
                    <StatHelpText>
                      <StatArrow type='increase' />
                      7%
                    </StatHelpText>
                  </Stat>
                </Flex>
              </CardBody>
            </Card>
            <Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme= {"grey"} variant='outline'>
            <CardBody>
              <Flex alignItems={"center"} height={"100%"}>
                <Stat>
                  <StatLabel>Churn Rate</StatLabel>
                  <StatNumber fontSize={"3xl"}>8.9%</StatNumber>
                  <StatHelpText>
                    <StatArrow type='decrease' />
                    21%
                  </StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          </SimpleGrid><Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex flexDirection={"column"} alignItems={"start"} height={"100%"}>
                <Stat>
                  <StatLabel>Monthly Recurring Revenue</StatLabel>
                  <StatNumber fontSize={"3xl"}>$12,231</StatNumber>
                  <StatHelpText>
                    <StatArrow type='increase' />
                    6%
                  </StatHelpText>
                </Stat>
                <div style={{ width: '100%', height: 250, marginTop:"1.5rem" }}>
                  <ResponsiveContainer>
                    <AreaChart
                      data={[
                        {
                            "date": "Nov 18, 23",
                            "val": 9002
                        },
                        {
                            "date": "Nov 19, 23",
                            "val": 9723
                        },
                        {
                            "date": "Nov 20, 23",
                            "val": 9993
                        },
                        {
                            "date": "Nov 21, 23",
                            "val": 10411
                        },
                        {
                            "date": "Nov 22, 23",
                            "val": 11023
                        },
                        {
                            "date": "Nov 23, 23",
                            "val": 12334
                        },
                        {
                            "date": "Nov 24, 23",
                            "val": 12231
                        }
                    ]}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid opacity={0.3} vertical={false} />
                      <XAxis opacity={0.7} dataKey="date" interval={"equidistantPreserveStart"}  />
                      <YAxis tickFormatter={(value) => new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short"}).format(value)} opacity={0.7} dataKey="val" for />
                      <RTT formatter={(value, name, props) => [`$${value.toLocaleString()}`, "MRR"]} />
                      <Area type="monotone" dataKey="val" stroke="#076dcd" fill="#3182CE" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Flex>
            </CardBody>
          </Card>
          <Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex flexDirection={"column"} alignItems={"start"} height={"100%"}>
                <Stat>
                  <StatLabel>Annual Recurring Revenue</StatLabel>
                  <StatNumber fontSize={"3xl"}>$138,928</StatNumber>
                  <StatHelpText>
                    <StatArrow type='increase' />
                    6%
                  </StatHelpText>
                </Stat>
                <div style={{ width: '100%', height: 250, marginTop:"1.5rem" }}>
                  <ResponsiveContainer>
                    <AreaChart
                      data={[
                        {
                            "date": "Nov 18, 23",
                            "val": 95034
                        },
                        {
                            "date": "Nov 19, 23",
                            "val": 84523
                        },
                        {
                            "date": "Nov 20, 23",
                            "val": 99342
                        },
                        {
                            "date": "Nov 21, 23",
                            "val": 100324
                        },
                        {
                            "date": "Nov 22, 23",
                            "val": 114442
                        },
                        {
                            "date": "Nov 23, 23",
                            "val": 129162
                        },
                        {
                            "date": "Nov 24, 23",
                            "val": 138928
                        }
                    ]}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid opacity={0.3} vertical={false} />
                      <XAxis opacity={0.7} dataKey="date" interval={"equidistantPreserveStart"}  />
                      <YAxis tickFormatter={(value) => new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short"}).format(value)} opacity={0.7} dataKey="val" for />
                      <RTT formatter={(value, name, props) => [`$${value.toLocaleString()}`, "ARR"]} />
                      <Area type="monotone" dataKey="val" stroke="#076dcd" fill="#3182CE" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Flex>
            </CardBody>
          </Card>
          </Box>
          </>}
      </Flex>
    </Flex>
    <Footer />
    </>
  )
}