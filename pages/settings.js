import Head from 'next/head'
import Header from '@/components/Header'
import { Flex, Text, Button, IconButton, Spinner, useToast,
  Heading,
  Divider,
  Radio,
  RadioGroup,
  Stack,
  Box,
  Input,
  Alert,
  AlertIcon,
  Link,
  Card,
  CardBody,
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
  List,
  ListItem,
  ListIcon,
  CardHeader,
  Switch,
  InputGroup,
  InputRightElement,
  Collapse,
  UnorderedList
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FaArrowAltCircleRight, FaArrowRight, FaChevronDown, FaPercentage, FaSearch } from 'react-icons/fa'
import { supabase } from '@/components/utils/supabase'
import { useRouter } from 'next/router'
import Footer from '@/components/Footer'
import { MdOutlineCalendarMonth, MdOutlineDiscount } from 'react-icons/md'
import dynamic from 'next/dynamic'

export default function Settings() {

  const { isOpen: isCreateIn, onOpen: openCreateIn, onClose: closeCreateIn } = useDisclosure({defaultIsOpen:false})

  const [discountChecked, setDiscountChecked] = useState(false) 
  const [discountViewEnabled, setDiscountViewEnabled] = useState(false)
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
              description: "Upgrade to manage your email settings.",
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
  const [statsLoading, setStatsLoading] = useState(true) 

  const [hoursAfter, setHoursAfter] = useState() 
  const [selectedCoupon, setSelectedCoupon] = useState() 
  const [senderName, setSenderName] = useState() 
  const [emailSubject, setEmailSubject] = useState() 
  const [senderEmail, setSenderEmail] = useState() 

  useEffect(() => {
    (async () => { 
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setStatsLoading(true)

      if (user.user_metadata.businesses) {
        if (user.user_metadata.domain) {
          setDiscountViewEnabled(user.user_metadata.sendingSettings.discount.enabled)
          setHoursAfter(parseInt(parseInt(user.user_metadata.sendingSettings.sendAfter)/3600))
          setSelectedCoupon(user.user_metadata.sendingSettings.discount.code)
          setSenderName(user.user_metadata.sendingSettings.senderName.length>0?user.user_metadata.sendingSettings.senderName:user.user_metadata.domain[0].toUpperCase() + user.user_metadata.domain.slice(1))
          setEmailSubject(user.user_metadata.sendingSettings.contents.subject.length>0?user.user_metadata.sendingSettings.contents.subject:"We Miss You!")
          setSenderEmail(user.user_metadata.sendingSettings.senderEmail.length>0?user.user_metadata.sendingSettings.senderEmail:"noreply@"+user.user_metadata.domain)
          
          setSendingEnabled(user.user_metadata.sendingSettings.sending)
          
          if (user.user_metadata.sendingSettings.discount.enabled) {   
          setAlrCouponsLoading(true)
          const coups = await fetch("https://churnaxe.com/get-coupons", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ act:user.user_metadata.businesses[0] }),
          });

          const reee = await coups.json();
          setAlrCoupons(reee.coupons) 
          setAlrCouponsLoading(false)
          setDiscountChecked(user.user_metadata.sendingSettings.discount.enabled)
        }
      }

      if (!(user.user_metadata.domain)) {
          onOpen()
      }

      setStatsLoading(false)
      }
    })();
  }, [])

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
      }
      setVerifyingRecords(false)
      router.reload()
  }

  const [alrCoupons, setAlrCoupons] = useState([{}])
  const [alrCouponsSearch, setAlrCouponsSearch] = useState([])
  const [alrCouponsLoading, setAlrCouponsLoading] = useState(true)
  const [newCouponType, setNewCouponType] = useState("percent")

  const [newCouponCurrency, setNewCouponCurrency] = useState("USD")
  const [monthsCouponCreate, setMonthsCouponCreate] = useState(1)
  const [newCouponCode, setNewCouponCode] = useState("")
  const [newCouponValue, setNewCouponValue] = useState(0.00)

  const CustomEditor = dynamic(() => import('../components/EmailEditor.jsx'), {
    loading: function loadingSpinner(){ return(<Box width={"100%!important"} display={"flex"} justifyContent={"center"}><Spinner size="lg" /></Box>)}, ssr: false
  })

  return (
    <>
    <Head>
        <link rel="canonical" href="https://churnaxe.com/settings" />

        <title>Email Settings - ChurnAxe</title>
        <meta name="description" content="Here you can manage your recovery email, manage discounts, and manage your brand appearance." />

        <meta name="twitter:title" content="Email Settings - ChurnAxe" />
        <meta name="twitter:description" content="Here you can manage your recovery email, manage discounts, and manage your brand appearance." />
        <meta name="twitter:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://churnaxe.com/settings`}/>

        <meta property="og:title" content="Email Settings - ChurnAxe" />
        <meta property="og:description" content="Here you can manage your recovery email, manage discounts, and manage your brand appearance." />
        <meta property="og:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta property="og:url" content={`https://churnaxe.com/settings`}/>

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
        <Flex flexDirection={"column"} w={"100%"} alignItems={"center"} minHeight="100vh" mx="auto" maxWidth={"1250px"}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          pt={15}
          maxWidth={750}
          textAlign={"center"}
          direction={{ base: 'column', md: 'row' }}>
          <Stack flex={1} spacing={{ base: 7, md: 5 }}>
            <Heading
              lineHeight={1.2}
              fontWeight={600}
              fontSize={{ base: '4xl', sm: '5xl', lg: '6xl' }}>
              <Text
                fontFamily={"'Montserrat', sans-serif!important"}
                as={'span'}
                position={'relative'}
                pr={1}
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
                Recovery Email
              </Text>
              <br />
              <Text fontFamily={"'Montserrat', sans-serif!important"} as={'span'} color={'blue.300'}>
              Settings
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={"lg"}
            fontFamily={"'Montserrat', sans-serif!important"}>
              Here you can <strong>manage your recovery email</strong>, <strong>manage discounts</strong>, and <strong>manage your brand appearance</strong> - all in a few seconds.
            </Text>
          </Stack>
        </Stack>
        <Divider borderColor={"#4A5568"} opacity={0.3} id='Businesses' mb={3} mt={10} />
        {!statsLoading ? user.user_metadata.domain ? <><Card width={"100%"} mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardHeader borderBottom={"1px solid #4a556821"} p={8} mb={2}>
                <Heading fontSize='large' fontWeight={400} fontFamily={"'Montserrat', sans-serif!important"}>Email Settings</Heading>
            </CardHeader>
            <CardBody>
                <FormLabel mb={4} fontSize={"medium"}>Sending Domain</FormLabel>
                <FormControl>
                    <Input background={"gray.100"} isReadOnly={true} type='text' value={user.user_metadata.domain} />
                    <FormHelperText mt={4}>The domain recovery emails are sent from. To change this, please reach out to <Link color={'blue.300'} _hover={{ textDecoration:"none",opacity:0.8 }} href='/contact'>support</Link>.</FormHelperText>
                </FormControl>
                <FormControl mt={7}>
                    <Flex alignItems={"center"}>
                        <FormLabel fontWeight={400} htmlFor='sendingSwitch' mb='0'>
                            Enable Sending?
                        </FormLabel>
                        <Switch onChange={async (e) => { 
                          const {data:userobj} = await supabase.auth.getUser()
                          let md = userobj.user.user_metadata
                          md.sendingSettings.sending = e.target.checked
                          await supabase.auth.updateUser({data:md})
                          setSendingEnabled(e.target.checked)
                      }} defaultChecked={sendingEnabled} id='sendingSwitch'/>
                    </Flex>
                    <FormHelperText mt={4}>Pause or resume the sending of recovery emails to churned subscribers.</FormHelperText>
                </FormControl>
                <FormControl mt={7}>
                    <Flex alignItems={"center"}>
                        <FormLabel fontWeight={400} htmlFor='discountSwitch' mb='0'>
                            Enable Discount?
                        </FormLabel>
                        <Switch defaultChecked={discountViewEnabled} onChange={ async (e) => {
                          const { data: { user } } = await supabase.auth.getUser()
                          if (e.target.checked) {
                            setAlrCouponsLoading(true)
                            const response = await fetch("https://churnaxe.com/get-coupons", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ act:user.user_metadata.businesses[0] }),
                              });

                              const result = await response.json();
                              setAlrCoupons(result.coupons) 
                          }
                          let md = user.user_metadata
                          md.sendingSettings.discount.enabled = e.target.checked
                          await supabase.auth.updateUser({data:md})
                          setDiscountViewEnabled(e.target.checked)
                          setDiscountChecked(e.target.checked)
                          setAlrCouponsLoading(false)
                        }} id='discountSwitch'/>
                    </Flex>
                    <FormHelperText mt={4}>Send churned customers a discount in the recovery email.</FormHelperText>
                </FormControl>
                {discountChecked ? !alrCouponsLoading ? <><Flex mt={6} pl={3} flexDirection={"column"}>
                    <Text mb={2}>Select a coupon from the list below, or create a new one.</Text>
                    <InputGroup mt={5} mb={2}>
                      <Input onChange={(e) => {
                        if (e.target.value.length === 0) {
                          setAlrCouponsSearch([])
                        } else {
                          setAlrCouponsSearch(alrCoupons.filter(els => (els.code).toLowerCase().includes(e.target.value.toLowerCase())))
                        }
                      }} type='text' placeholder={"Search for a code..."} />
                      <InputRightElement mr={2} width='4.5rem'>
                        <FaSearch />
                      </InputRightElement>
                    </InputGroup>
                    <Card my={2} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
                        <CardBody>
                            <Flex alignItems={"start"} flexDirection={"column"} height={"100%"}>
                              <Flex alignItems={"center"} width={"100%"} justifyContent={"space-between"}><FormLabel fontWeight={400} mb={0} fontSize={"medium"}>Create a new discount code</FormLabel><IconButton icon={<FaChevronDown />} opacity={0.8} borderRadius={"100%"} color={"inherit"} colorScheme={"grey"} borderColor={"gray.200"} variant={"outline"} onClick={isCreateIn ? closeCreateIn : openCreateIn} /></Flex>
                              <Collapse style={{width:"100%"}} in={isCreateIn}>
                                <Box pt={5} width={"100%"}>
                                  <FormControl mb={8}>
                                      <Input onChange={(e) => {
                                        e.target.value = e.target.value.replace(/ /g, "")
                                        setNewCouponCode(e.target.value.replace(/ /g, ""))
                                      }} pattern="\S(.*\S)?" type='text' placeholder='Code' />
                                      <FormHelperText mt={4}>The code customers will enter to get the discount. Code cannot include whitespace.</FormHelperText>
                                  </FormControl>
                                  <FormControl mt={4}>
                                    <RadioGroup defaultValue='percent' my={3} onChange={(e) => setNewCouponType(e)}>
                                      <Stack>
                                        <Radio value={"percent"} spacing={3}>Percentage off</Radio>
                                        <Radio value={"fixed"} spacing={3}>Fixed amount</Radio>
                                      </Stack>
                                    </RadioGroup>
                                    <InputGroup mt={3}>
                                      <Input onChange={(e) => setNewCouponValue(e.target.value)} type='number' placeholder={newCouponType == "fixed"?"0.00":"0"} />
                                      <InputRightElement mr={2} width='4.5rem'>
                                        {newCouponType == "fixed"?<Input onChange={(e) => setNewCouponCurrency(e.target.value)} isInvalid={!(['USD','AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN','BAM','BBD','BDT','BGN','BIF','BMD','BND','BOB','BRL','BSD','BWP','BYN','BZD','CAD','CDF','CHF','CLP','CNY','COP','CRC','CVE','CZK','DJF','DKK','DOP','DZD','EGP','ETB','EUR','FJD','FKP','GBP','GEL','GIP','GMD','GNF','GTQ','GYD','HKD','HNL','HTG','HUF','IDR','ILS','INR','ISK','JMD','JPY','KES','KGS','KHR','KMF','KRW','KYD','KZT','LAK','LBP','LKR','LRD','LSL','MAD','MDL','MGA','MKD','MMK','MNT','MOP','MUR','MVR','MWK','MXN','MYR','MZN','NAD','NGN','NIO','NOK','NPR','NZD','PAB','PEN','PGK','PHP','PKR','PLN','PYG','QAR','RON','RSD','RUB','RWF','SAR','SBD','SCR','SEK','SGD','SHP','SLE','SOS','SRD','STD','SZL','THB','TJS','TOP','TRY','TTD','TWD','TZS','UAH','UGX','UYU','UZS','VND','VUV','WST','XAF','XCD','XOF','XPF','YER','ZAR','ZMW'].includes(newCouponCurrency))} type='text' maxLength={3} id='fixed' defaultValue={"USD"} h='1.75rem' />:<Text id='perce' textAlign={"center"} h='1.75rem' >%</Text>}
                                      </InputRightElement>
                                    </InputGroup>
                                    <FormHelperText mt={4}>{newCouponType == "fixed"?"Fixed amount to reduce the original price by.":"The percentage to reduce the original price by."}</FormHelperText>
                                    <InputGroup mt={8}>
                                      <Input placeholder='Months' onChange={(e) => setMonthsCouponCreate(e.target.value)} type='number' defaultValue={1} min={1} />
                                      <InputRightElement mr={2} width='4.5rem'>
                                        <Text id='months' textAlign={"center"} h='1.75rem' >Month(s)</Text>
                                      </InputRightElement>
                                    </InputGroup>
                                    <FormHelperText mt={4}>The number of months for the discount to be applied.</FormHelperText>
                                  </FormControl>
                                  <Button mt={4} onClick={async() => {
                                    const { data: { user } } = await supabase.auth.getUser()
                                    if (newCouponCode && newCouponType && newCouponValue && (monthsCouponCreate > 0)) {
                                      const response = await fetch("https://churnaxe.com/create-coupon", {
                                          method: "POST",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({ act:user.user_metadata.businesses[0], type:newCouponType, value:newCouponValue, currency:newCouponCurrency, code:newCouponCode, duration:monthsCouponCreate }),
                                        });

                                        const text = await response.clone().text();

                                          if (text == "currency") {
                                            const id = 'coupon-error'
                                            if (!toast.isActive(id)) {
                                                toast({
                                                    id,
                                                    title: "Invalid Currency.",
                                                    description: "Ensure the 3-digit currency code is correct.",
                                                    status: "error",
                                                    position: "top-end",
                                                    duration: 7500,
                                                    isClosable: true,
                                                })
                                                return;
                                            }
                                          }

                                          if (text == "vals") {
                                            const id = 'coupon-error'
                                            if (!toast.isActive(id)) {
                                                toast({
                                                    id,
                                                    title: "Invalid Values.",
                                                    description: "Ensure the discount and duration values are correct.",
                                                    status: "error",
                                                    position: "top-end",
                                                    duration: 7500,
                                                    isClosable: true,
                                                })
                                                return;
                                            }
                                          }
          
                                        const result = await response.clone().json();
                                        setAlrCoupons(result.coupons)
                                        const id = 'coupon-toast'
                                        if (!toast.isActive(id)) {
                                            toast({
                                                id,
                                                title: "Coupon Created.",
                                                description: "You can now add this coupon to your recovery emails.",
                                                status: "success",
                                                position: "top-end",
                                                duration: 7500,
                                                isClosable: true,
                                            })
                                        }
                                    }
                                  }} colorScheme={"blue"} rightIcon={<FaArrowRight />}>Create</Button>
                                </Box>
                              </Collapse>
                            </Flex>
                        </CardBody>
                    </Card>
                    <RadioGroup onChange={async (e) => { 
                          const {data:userobj} = await supabase.auth.getUser()
                          let md = userobj.user.user_metadata
                          md.sendingSettings.discount.code = e
                          await supabase.auth.updateUser({data:md})
                      }} defaultValue={selectedCoupon}>{alrCouponsSearch.length == 0 ? alrCoupons.map(el => <Card key={el.code} my={2} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
                        <CardBody>
                            <Flex alignItems={"start"} flexDirection={"column"} height={"100%"}>
                                <Radio value={el.code.concat("+=+"+el.coupon.id)} spacing={3}>{el.code}</Radio>
                                <List mt={4} spacing={3}>
                                    <ListItem>
                                        <ListIcon as={FaPercentage} color='green.500' />
                                        Discount: {el.coupon.amount_off ? `${parseInt(el.coupon.amount_off/100)} ${String(el.coupon.currency).toUpperCase()}` : el.coupon.percent_off ? `${el.coupon.percent_off}%` : null}
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdOutlineDiscount} color='green.500' />
                                        Max Redemptions: {el.coupon.max_redemptions ?? "N/A"}
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdOutlineCalendarMonth} color='green.500' />
                                        Active For: {el.coupon.duration == "repeating" ? el.coupon.duration_in_months ? `${el.coupon.duration_in_months} Months` : "N/A" : el.coupon.duration == "once" ? "One Period" : "Forever"}
                                    </ListItem>
                                </List>
                            </Flex>
                        </CardBody>
                    </Card>) : alrCouponsSearch.map(el => <Card key={el.code} my={2} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
                        <CardBody>
                            <Flex alignItems={"start"} flexDirection={"column"} height={"100%"}>
                                <Radio value={el.code} spacing={3}>{el.code}</Radio>
                                <List mt={4} spacing={3}>
                                    <ListItem>
                                        <ListIcon as={FaPercentage} color='green.500' />
                                        Discount: {el.coupon.amount_off ? `${parseInt(el.coupon.amount_off/100)} ${String(el.coupon.currency).toUpperCase()}` : el.coupon.percent_off ? `${el.coupon.percent_off}%` : null}
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdOutlineDiscount} color='green.500' />
                                        Max Redemptions: {el.coupon.max_redemptions ?? "N/A"}
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdOutlineCalendarMonth} color='green.500' />
                                        Active For: {el.coupon.duration == "repeating" ? el.coupon.duration_in_months ? `${el.coupon.duration_in_months} Months` : "N/A" : el.coupon.duration == "once" ? "One Period" : "Forever"}
                                    </ListItem>
                                </List>
                            </Flex>
                        </CardBody>
                    </Card>)} 
                    </RadioGroup>
                </Flex></> : <Flex w={"100%"} mt={6} pl={3} justifyContent={"flex-start"}><Spinner /></Flex> : null}
            </CardBody>
          </Card><Card width={"100%"} mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardHeader borderBottom={"1px solid #4a556821"} p={8} mb={2}>
                <Heading fontSize='large' fontWeight={400} fontFamily={"'Montserrat', sans-serif!important"}>Sending Settings</Heading>
            </CardHeader>
            <CardBody>
                <FormControl isRequired mt={0}>
                <FormLabel mb={4} fontSize={"medium"}>Send After</FormLabel>
                  <InputGroup>
                    <Input onChange={ async (e) => {
                      if (e.target.value > 0 && e.target.value < 49) {
                        setHoursAfter(parseInt(e.target.value))
                        const {data:userobj} = await supabase.auth.getUser()
                        let md = userobj.user.user_metadata
                        md.sendingSettings.sendAfter = e.target.value*3600
                        await supabase.auth.updateUser({data:md})
                      }
                    }} step={1} defaultValue={hoursAfter} max={48} min={1} type='number' placeholder='Hours' />
                    <InputRightElement mr={2} width='4.5rem'>
                      <Text id='hours' textAlign={"center"} h='1.75rem'>Hour(s)</Text>
                      </InputRightElement>
                  </InputGroup>
                  <FormHelperText mt={4}>The number of hours after a customer churns to send the recovery email. <strong>Default is 48</strong>.</FormHelperText>
                </FormControl>
                <FormControl isRequired mt={7}>
                <FormLabel mb={4} fontSize={"medium"}>Sender Name</FormLabel>
                  <InputGroup>
                    <Input onChange={ async (e) => {
                      if (e.target.value.length > 0) {
                        setSenderName(e.target.value)
                        const {data:userobj} = await supabase.auth.getUser()
                        let md = userobj.user.user_metadata
                        md.sendingSettings.senderName = e.target.value
                        await supabase.auth.updateUser({data:md})
                      }
                    }} defaultValue={senderName} type='text' placeholder='Name' />
                  </InputGroup>
                  <FormHelperText mt={4}>The name your churned customers will see the recovery email addressed from in their inbox.</FormHelperText>
                </FormControl>
                <FormControl isRequired mt={7}>
                  <FormLabel mb={4} fontSize={"medium"}>Sender Email</FormLabel>
                  <InputGroup>
                    <Input onChange={ async (e) => {
                      if (e.target.value.length > 0) {
                        if (e.target.value.includes(user.user_metadata.domain)) {
                          setSenderEmail(e.target.value)
                          const {data:userobj} = await supabase.auth.getUser()
                          let md = userobj.user.user_metadata
                          md.sendingSettings.senderEmail = e.target.value
                          await supabase.auth.updateUser({data:md})
                        }
                      }
                    }} defaultValue={senderEmail} type='email' placeholder='Email address' />
                  </InputGroup>
                  <FormHelperText mt={4}>The email address your churned customers will receive recovery emails from in their inbox. <strong>Must be from the domain used to send emails.</strong></FormHelperText>
                </FormControl>
                <FormControl isRequired mt={7}>
                <FormLabel mb={4} fontSize={"medium"}>Email Subject</FormLabel>
                  <InputGroup>
                    <Input onChange={ async (e) => {
                      if (e.target.value.length > 0) {
                        setEmailSubject(e.target.value)
                        const {data:userobj} = await supabase.auth.getUser()
                        let md = userobj.user.user_metadata
                        md.sendingSettings.contents.subject = e.target.value
                        await supabase.auth.updateUser({data:md})
                      }
                    }} defaultValue={emailSubject} type='text' placeholder='Subject' />
                  </InputGroup>
                  <FormHelperText mt={4}>The subject line of the recovery email in the churned customer&apos;s inbox.</FormHelperText>
                </FormControl>
            </CardBody>
          </Card><Card width={"100%"} mt={5} overflow='hidden' background={"#FFFFFF"} color={"inherit"} borderColor={"gray.200"} colorScheme={"grey"} variant='outline'>
            <CardHeader borderBottom={"1px solid #4a556821"} p={8} mb={2}>
                <Heading fontSize='large' fontWeight={400} fontFamily={"'Montserrat', sans-serif!important"}>Email Designer</Heading>
            </CardHeader>
            <CardBody>
              <Text fontSize={"large"} fontWeight={"bold"} mb={3}>Email Variables: </Text>
              <UnorderedList mb={6}>
                <ListItem mb={4}>
                  {"{{ DISCOUNT_CODE }}"} - Inserts the discount code selected, if any. This would insert <strong>{discountChecked ? selectedCoupon.split("+=+")[0] : "N/A"}</strong> with your current settings.
                </ListItem>
                <ListItem mb={4}>
                  {"{{ DISCOUNT_AMOUNT }}"} - Inserts the value of the discount, if any. This would insert <strong>{discountChecked && selectedCoupon ? alrCoupons.find(el => el.code.concat("+=+"+el.coupon.id) == selectedCoupon).coupon.amount_off ? `${parseInt(alrCoupons.find(el => el.code.concat("+=+"+el.coupon.id) == selectedCoupon).coupon.amount_off/100)} ${String(alrCoupons.find(el => el.code.concat("+=+"+el.coupon.id) == selectedCoupon).coupon.currency).toUpperCase()}` : alrCoupons.find(el => el.code.concat("+=+"+el.coupon.id) == selectedCoupon).coupon.percent_off ? `${alrCoupons.find(el => el.code.concat("+=+"+el.coupon.id) == selectedCoupon).coupon.percent_off}%` : "N/A" : "N/A"}</strong> with your current settings.
                </ListItem>
                <ListItem mb={4}>
                  {"{{ CUSTOMER_EMAIL }}"} - Inserts the email address of the customer that the email is sent to.
                </ListItem>
              </UnorderedList>
              <CustomEditor />
            </CardBody></Card></> : <Flex w={"100%"} mt={6} pl={3} justifyContent={"center"}><Spinner /></Flex> : null}
      </Flex>
    </Flex>
    <Footer />
    </>
  )
}