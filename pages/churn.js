import Head from 'next/head'
import Header from '@/components/Header'
import { Flex, Table, Thead, Tbody, Tr, Th, Td, Text, TableCaption, TableContainer, Button, Spinner, useToast,
  Heading,
  Divider,
  Stack,
  Box,
  Input,
  Alert,
  AlertIcon,
  Link,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardBody,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  FormControl,
  FormHelperText,
  FormLabel,
  FormErrorMessage,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Textarea,
  CardHeader
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FaArrowAltCircleRight, FaArrowDown, FaArrowRight } from 'react-icons/fa'
import { AiOutlineReload } from 'react-icons/ai'
import { supabase } from '@/components/utils/supabase'
import { useRouter } from 'next/router'
import Footer from '@/components/Footer'
import { CiCircleRemove, CiCircleCheck } from 'react-icons/ci'

export default function Dashboard() {

  const [sendingEnabled, setSendingEnabled] = useState(false)

  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    (async () => { 
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          const id = 'redir-toast'
          if (!toast.isActive(id)) {
            toast({
              id,
              title: "Redirecting...",
              description: "Sign in to use ChurnAxe.",
              status: "warning",
              position: "top-end",
              duration: 7500,
              isClosable: true,
            })
          }
          router.push('/sign-in')
        }
        let type = user.user_metadata.type
        if (type !== "subscribed") {
          const id = 'redir-toast'
          if (!toast.isActive(id)) {
            toast({
              id,
              title: "Redirecting...",
              description: "Upgrade to manage churn.",
              status: "warning",
              position: "top-end",
              duration: 7500,
              isClosable: true,
            })
          }
          router.push('/dashboard')
        }
    })();
  }, [])

  const [user, setUser] = useState({})   
  const [stats, setStats] = useState([]) 
  const [statsLoading, setStatsLoading] = useState(true) 

  const [churnedSubs, setChurnedSubs] = useState([]) 

  useEffect(() => {
    (async () => { 
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setStatsLoading(true)

      if (user.user_metadata.businesses) {
        const response = await fetch("https://churnaxe.com/churn-stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ acct_id:user.user_metadata.businesses[0],uid:user.id }),
        });

        const result = await response.json();
        setStats(result)
        setChurnedSubs(result.unsub)

        if (user.user_metadata.domain) {
          setSendingEnabled(user.user_metadata.sendingSettings.sending)
        }

        if (!(user.user_metadata.domain)) {
            onOpen()
        }

        setStatsLoading(false)
      }
    })();
  }, [])

  const refreshStats = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setStatsLoading(true)

    if (user.user_metadata.businesses) {
      const response = await fetch("https://churnaxe.com/churn-stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ acct_id:user.user_metadata.businesses[0],uid:user.id }),
      });

      const result = await response.json();
      setStats(result)
      setStatsLoading(false)
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [domainInp, setDomainInp] = useState('')
  const [dnsRecords, setDnsRecords] = useState([])

  const handleDomainInpChange = (e) => setDomainInp(e.target.value)

  const verifyDomain = async (domain) => {
    const response = await fetch("https://churnaxe.com/verify-domain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid:user.id, domain:domain }),
      });
      const text = await response.clone().text();

      if (text == "Domain with same name already exists") {
        const id = 'verif-error'
        if (!toast.isActive(id)) {
            toast({
                id,
                title: "Domain Already Exists.",
                description: "This domain has already been added to another account.",
                status: "error",
                position: "top-end",
                duration: 7500,
                isClosable: true,
            })
        }
      } else {
        const result = await response.clone().json();
        setDnsRecords(result)
        setActiveStep(1)
      }
  }

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: 2,
  })

  const [verifyingRecords, setVerifyingRecords] = useState(false)
  const [verifiedRecords, setVerifiedRecords] = useState([])

  const verifyDomainRecords = async (domain) => {
    setVerifyingRecords(true)
    const response = await fetch("https://churnaxe.com/verify-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid:user.id, domain:domain }),
      });

      const result = await response.json();
      setVerifiedRecords(result)
      if (Object.keys(result.records).length == 0) {
        onClose()
        const id = 'verif-toast'
        if (!toast.isActive(id)) {
            toast({
                id,
                title: "Domain Added.",
                description: "Please allow us up to 2 hours to check the DNS records.",
                status: "success",
                position: "top-end",
                duration: 7500,
                isClosable: true,
            })
        }
        router.reload()
      }
      setVerifyingRecords(false)
  }

  return (
    <>
      <Head>
        <link rel="canonical" href="https://churnaxe.com/churn" />

        <title>Churn - ChurnAxe</title>
        <meta name="description" content="Track churn rates, key statistics, and see which customers have interacted with your emails." />

        <meta name="twitter:title" content="Churn - ChurnAxe" />
        <meta name="twitter:description" content="Track churn rates, key statistics, and see which customers have interacted with your emails." />
        <meta name="twitter:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://churnaxe.com/churn`}/>

        <meta property="og:title" content="Churn - ChurnAxe" />
        <meta property="og:description" content="Track churn rates, key statistics, and see which customers have interacted with your emails." />
        <meta property="og:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta property="og:url" content={`https://churnaxe.com/churn`}/>

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
      <Modal scrollBehavior={"inside"} closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Domain</ModalHeader>
          <ModalBody>
          <Stepper mt={1} mb={8} flexDirection={{base:"column!important", md:"row!important"}} index={activeStep}>
            <Step>
              <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink='0'>
                   <StepTitle>Add Domain</StepTitle>
                   <StepDescription>Enter your domain</StepDescription>
                 </Box>

                 <StepSeparator />
              </Step>
              <Step>
              <StepIndicator opacity={activeStep == 0 ? 0.7:1}>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box opacity={activeStep == 0 ? 0.7:1} flexShrink='0'>
                  <StepTitle>Verify Domain</StepTitle>
                  <StepDescription>Enter DNS records</StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            </Stepper>
            {activeStep===0?<><Text>To send recovery emails to churned subscribers, you need to <strong>add and verify a domain</strong> to send the emails from.</Text>
            <Text mt={3}>Add your domain below and follow the steps provided to verify the domain. <strong>This won&apos;t take longer than a minute</strong>.</Text>
            <FormControl isInvalid={(/^(?:\*\.)?[a-z0-9]+(?:[\-.][a-z0-9]+)*\.[a-z]{2,6}$/.test(domainInp) == false && domainInp.length > 0)} mt={6}>
                <FormLabel>Domain</FormLabel>
                <Input placeholder='example.com' value={domainInp} onChange={handleDomainInpChange} type='text' />
                {((/^(?:\*\.)?[a-z0-9]+(?:[\-.][a-z0-9]+)*\.[a-z]{2,6}$/.test(domainInp) == true) || domainInp.length == 0) ? (
                    <FormHelperText mt={3}>Once added, click below to verify.</FormHelperText>
                ) : (
                    <FormErrorMessage mt={3}>Enter a valid domain.</FormErrorMessage>
                )}
            </FormControl>
            <Button width={"100%"} mt={4} onClick={() => verifyDomain(domainInp)} colorScheme={"blue"} rightIcon={<FaArrowRight />}>Add</Button></>:
            <>
            {verifiedRecords.length == 0 || verifiedRecords.records.dkim_record?<FormControl isReadOnly={true} mt={6}>
                <FormLabel mb={5}>DKIM Record</FormLabel>
                <FormHelperText my={3}>Type</FormHelperText>
                <Input background={"gray.100"} value={dnsRecords.dkim_record.type} readOnly type='text' />
                <FormHelperText my={3}>Name</FormHelperText>
                <Input background={"gray.100"} value={dnsRecords.dkim_record.host_name} readOnly type='text' />
                <FormHelperText my={3}>Value</FormHelperText>
                <Textarea background={"gray.100"} minHeight={200} value={dnsRecords.dkim_record.value} readOnly type='text' />
            </FormControl> : <Alert textAlign={"left"} borderRadius={7.5} mt={5} p={3} width={"100%!important"} status='success'>
              <Flex alignItems={"center"}>
                  <AlertIcon />
                  <Heading fontSize={"medium"} fontFamily={"'Montserrat', sans-serif!important"}>DKIM Record</Heading>
              </Flex>
            </Alert>}
            <Divider mt={5} borderColor={"#4A5568"} opacity={0.3} />
            {verifiedRecords.length == 0 || verifiedRecords.records.brevo_code?<FormControl isReadOnly={true} mt={6}>
                <FormLabel mb={5}>Domain Code</FormLabel>
                <FormHelperText my={3}>Type</FormHelperText>
                <Input background={"gray.100"} value={dnsRecords.brevo_code.type} readOnly type='text' />
                <FormHelperText my={3}>Name</FormHelperText>
                <Input background={"gray.100"} value={"@"} readOnly type='text' />
                <FormHelperText my={3}>Value</FormHelperText>
                <Textarea background={"gray.100"} minHeight={100} value={dnsRecords.brevo_code.value} readOnly type='text' />
            </FormControl> : <Alert textAlign={"left"} borderRadius={7.5} mt={5} p={3} width={"100%!important"} status='success'>
              <Flex alignItems={"center"}>
                  <AlertIcon />
                  <Heading fontSize={"medium"} fontFamily={"'Montserrat', sans-serif!important"}>Domain Code</Heading>
              </Flex>
            </Alert>}
            <Button width={"100%"} isLoading={verifyingRecords} mt={6} onClick={() => verifyDomainRecords(domainInp)} colorScheme={"blue"} rightIcon={<FaArrowAltCircleRight />}>Verify</Button>
            </>}
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex as="main" mx="auto" mt={6} px={5}>
        <Flex flexDirection={"column"} w={"100%"} minHeight="100vh" mx="auto" maxWidth={"1000px"}>
        <><Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          pt={0}
          mx={"auto"}
          textAlign="center"
          width={"100%!important"}
          direction={{ base: 'column', md: 'row' }}>
          <Stack flex={1} spacing={{ base: 4 }} width={"100%!important"}>
          <Alert textAlign={"left"} borderRadius={7.5} p={6} width={"100%!important"} backgroundColor={"#f8f8f8"} border={"1px solid"} borderColor={"gray.200"}>
              <Flex alignItems={"center"} justifyContent={"space-between"} width={"100%!important"}>
                <Flex maxWidth={1000} flex={1} mr={5} flexDirection={"column"}>
                  <Heading fontWeight={400} fontSize={"larger"} fontFamily={"'Montserrat', sans-serif!important"}><span>Managing Churn for <strong>{stats.name}</strong></span></Heading>
                  <Text mt={3}>Track churn rates, key statistics, and see which customers have interacted with your emails.</Text>
                </Flex>
                <Flex flex={0} alignItems={"center"} flexDirection={"column"}>
                  <Link mb={4} href={"#Stats"}><Button flex={2} textWrap={"wrap"} maxWidth={120} colorScheme={"blue"} backgroundColor={"#3182CE"} color={"#FFFFFF"} rightIcon={<FaArrowDown />}>Stats</Button></Link>
                  <Link href={"#Events"}><Button flex={2} textWrap={"wrap"} maxWidth={120} colorScheme={"blue"} backgroundColor={"#3182CE"} color={"#FFFFFF"} rightIcon={<FaArrowDown />}>Events</Button></Link>
                </Flex>
              </Flex>
            </Alert>
          </Stack>
        </Stack>
        <Divider borderColor={"#4A5568"} opacity={0.3} id='Stats' mb={6} mt={4} />
        {!statsLoading ? <><Flex width={"100%"} flexDirection={{base:"column",sm:"row"}} justifyContent={"flex-end"} alignItems={"center"}>
            <Button onClick={refreshStats} color={"inherit"} colorScheme={"grey"} maxWidth={350} borderColor={"gray.200"} mb={{ base:2, md:0 }} leftIcon={<AiOutlineReload fontWeight={800} />} mr={{base:0,sm:2}} size="md" variant={"outline"}>
              Refresh Stats
            </Button>
        </Flex>
        {!sendingEnabled?<Alert mt={5} textAlign={"left"} borderRadius={7.5} p={6} width={"100%!important"} status='warning'>
          <Flex alignItems={"center"}>
            <Flex maxWidth={1000} flex={1} mr={5} flexDirection={"column"}>
              <Heading fontWeight={400} fontSize={"larger"} fontFamily={"'Montserrat', sans-serif!important"}><span>Email Sending is <strong>Disabled</strong></span></Heading>
              <Text lineHeight={1.7} mt={3}>You are not currently sending recovery emails to churned subscribers. To enable sending, and modify other settings, <strong>go to the email settings page</strong>.</Text>
            </Flex>
            <Link href={"/settings"}><Button textWrap={"wrap"} backgroundColor={"#FFFFFF"} maxWidth={120} color={"inherit"} colorScheme={"grey"} borderColor={"gray.200"} rightIcon={<FaArrowRight fontWeight={800} />} size="md" variant={"outline"}>Edit</Button></Link>
          </Flex>
        </Alert>:null}
        <SimpleGrid mt={5} columns={{sm: 2, md: 3, lg:4}} spacing={{base:3, sm:2,md:3}}>
          <Card overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex alignItems={"center"} height={"100%"}>
                <Stat>
                  <StatLabel>Churned Subscribers</StatLabel>
                  <StatNumber my={2} fontSize={"3xl"}>{stats.churnedCount}</StatNumber>
                  <StatHelpText>
                    from {new Date(parseInt(new Date().getTime())-86400*30*1000).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}&nbsp;to&nbsp;{new Date(parseInt(new Date().getTime())).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}
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
                <StatNumber my={2} fontSize={"3xl"}>{stats.churnRate?parseInt(stats.churnRate).toLocaleString():"0"}%</StatNumber>
                <StatHelpText>
                    on {new Date(parseInt(new Date().getTime())-86400*30*1000).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}&nbsp;to&nbsp;{new Date(parseInt(new Date().getTime())).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}
                </StatHelpText>
              </Stat>
            </Flex>
          </CardBody>
        </Card>
        <Card overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex alignItems={"center"} height={"100%"}>
                <Stat>
                  <StatLabel>New Subscribers</StatLabel>
                  <StatNumber my={2} fontSize={"3xl"}>{parseInt(stats.newCount)}</StatNumber>
                  <StatHelpText>
                    from {new Date(parseInt(new Date().getTime())-86400*30*1000).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}&nbsp;to&nbsp;{new Date(parseInt(new Date().getTime())).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}
                  </StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          <Card overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex alignItems={"center"} height={"100%"}>
                <Stat>
                  <StatLabel>Churned MRR</StatLabel>
                  <StatNumber my={2} fontSize={"3xl"}>${parseInt(stats.lostMrr)}</StatNumber>
                  <StatHelpText>
                    from {new Date(parseInt(new Date().getTime())-86400*30*1000).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}&nbsp;to&nbsp;{new Date(parseInt(new Date().getTime())).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}
                  </StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
        </SimpleGrid>
        <Card mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardHeader borderBottom={"1px solid #4a556821"} p={8} mb={3}>
                <Heading fontSize='large' fontWeight={400} fontFamily={"'Montserrat', sans-serif!important"}>Churned Customers</Heading>
            </CardHeader>
            <CardBody>
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption fontFamily={"'Montserrat', sans-serif!important"}>Recently Churned</TableCaption>
                        <Thead>
                        <Tr>
                            <Th fontFamily={"'Montserrat', sans-serif!important"}>Customer Email</Th>
                            <Th fontFamily={"'Montserrat', sans-serif!important"}>Churned On</Th>
                            <Th fontFamily={"'Montserrat', sans-serif!important"}>Churned MRR</Th>
                            <Th fontFamily={"'Montserrat', sans-serif!important"}>Recovery Sent</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        {churnedSubs.map((s) => <Tr key={s.email}>
                            <Td fontFamily={"'Montserrat', sans-serif!important"}>{s.email}</Td>
                            <Td fontFamily={"'Montserrat', sans-serif!important"}>{new Date(s.date*1000).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}</Td>
                            <Td fontFamily={"'Montserrat', sans-serif!important"}>${parseInt(s.mrr)}</Td>
                            <Td fontFamily={"'Montserrat', sans-serif!important"}>{new Date(user.created_at).getTime() < new Date(s.date*1000).getTime() ? parseInt(stats.sentEmails.filter((val,ind,arr) => val.sent_to == s.email)[0].sent_at) < parseInt(new Date(Date.now()).getTime()) ?<CiCircleCheck color='#38A169' size={30}/> : "Pending" : "N/A"}</Td>
                        </Tr>)}
                        </Tbody>
                    </Table>
                </TableContainer>
            </CardBody>
          </Card>
          <Card id='Events' mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardHeader borderBottom={"1px solid #4a556821"} p={8} mb={3}>
                <Heading fontSize='large' fontWeight={400} fontFamily={"'Montserrat', sans-serif!important"}>Email Events</Heading>
            </CardHeader>
            <CardBody>
          <SimpleGrid columns={{sm: 2,md:3}} spacing={{base:3,sm:2,md:3}}>
          <Card overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex alignItems={"center"} height={"100%"}>
                <Stat>
                  <StatLabel>Emails Delivered</StatLabel>
                  <StatNumber my={2} fontSize={"3xl"}>{stats.sentEmails.filter(el => el.events.some(o => "delivered" in o) && parseInt(el.sent_at) < Date.now()).length}</StatNumber>
                  <StatHelpText>
                    from {new Date(parseInt(new Date().getTime())-86400*30*1000).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}&nbsp;to&nbsp;{new Date(parseInt(new Date().getTime())).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}
                  </StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
        <Card overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex alignItems={"center"} height={"100%"}>
                <Stat>
                  <StatLabel>Emails Opened</StatLabel>
                  <StatNumber my={2} fontSize={"3xl"}>{stats.sentEmails.filter(el => el.events.some(o => "opened" in o)).length}</StatNumber>
                  <StatHelpText>
                    from {new Date(parseInt(new Date().getTime())-86400*30*1000).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}&nbsp;to&nbsp;{new Date(parseInt(new Date().getTime())).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}
                  </StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          <Card overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardBody>
              <Flex alignItems={"center"} height={"100%"}>
                <Stat>
                  <StatLabel>Links Clicked</StatLabel>
                  <StatNumber my={2} fontSize={"3xl"}>{stats.sentEmails.filter(el => el.events.some(o => "clicked" in o)).length}</StatNumber>
                  <StatHelpText>
                    from {new Date(parseInt(new Date().getTime())-86400*30*1000).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}&nbsp;to&nbsp;{new Date(parseInt(new Date().getTime())).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}
                  </StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
        </SimpleGrid>
        <TableContainer mt={8}>
          <Table variant='simple'>
              <TableCaption fontFamily={"'Montserrat', sans-serif!important"} opacity={stats.sentEmails.length > 0 ? 1 : 0.6}>Recent Events - Last 30 Days</TableCaption>
              <Thead>
              <Tr>
                  <Th fontFamily={"'Montserrat', sans-serif!important"}>Customer Email</Th>
                  <Th fontFamily={"'Montserrat', sans-serif!important"}>Sent On</Th>
                  <Th fontFamily={"'Montserrat', sans-serif!important"}>Email Opened</Th>
                  <Th fontFamily={"'Montserrat', sans-serif!important"}>Link Clicked</Th>
              </Tr>
              </Thead>
              <Tbody>
              {stats.sentEmails.map((s) => <Tr key={s.sent_to}>
                  <Td fontFamily={"'Montserrat', sans-serif!important"}>{s.sent_to}</Td>
                  <Td fontFamily={"'Montserrat', sans-serif!important"}>{parseInt(s.sent_at) > Date.now() ? "Pending - " + new Date(parseInt(s.sent_at)).toLocaleDateString('en-us', { day:"2-digit", month:"short" }) : new Date(parseInt(s.sent_at)).toLocaleDateString('en-us', { day:"2-digit", month:"short" })}</Td>
                  <Td fontFamily={"'Montserrat', sans-serif!important"}>{s.events.some(o => "opened" in o)?<CiCircleCheck color='#38A169' size={30}/>:<CiCircleRemove color='#E53E3E' size={30} />}</Td>
                  <Td fontFamily={"'Montserrat', sans-serif!important"}>{s.events.some(o => "clicked" in o)?<CiCircleCheck color='#38A169' size={30}/>:<CiCircleRemove color='#E53E3E' size={30} />}</Td>
              </Tr>)}
              </Tbody>
          </Table>
        </TableContainer>
        </CardBody>
        </Card>
        </> : <Flex w={"100%"} mt={4} justifyContent={"center"}><Spinner /></Flex>}</>
      </Flex>
    </Flex>
    <Footer />
    </>
  )
}