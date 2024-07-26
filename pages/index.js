import Head from 'next/head'
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  Link,
  SimpleGrid,
  Stat,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react'
import NHeader from '../components/NHeader'
import Footer from '../components/Footer.jsx'
import { FaArrowRight } from 'react-icons/fa'
import { FcLineChart, FcFeedback, FcDataSheet } from 'react-icons/fc';
import Pricing from '../components/Pricing.jsx'

export default function CAHome() { 
  const Feature = ({ title, text, icon }) => {
    return (
      <Stack>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={'gray.100'}
          mb={1}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{title}</Text>
        <Text color={'gray.600'}>{text}</Text>
      </Stack>
    );
  };

  return (
    <div>
      <Head>
        <link rel="canonical" href="https://churnaxe.com/" />

        <title>ChurnAxe - Cut Down Churn, Automatically!</title>
        <meta name="description" content="With ChurnAxe, you can lower your churn and increase your revenue automatically, all in just minutes!" />

        <meta name="twitter:title" content="ChurnAxe - Cut Down Churn, Automatically!" />
        <meta name="twitter:description" content="With ChurnAxe, you can lower your churn and increase your revenue automatically, all in just minutes!" />
        <meta name="twitter:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://churnaxe.com/`}/>

        <meta property="og:title" content="ChurnAxe - Cut Down Churn, Automatically!" />
        <meta property="og:description" content="With ChurnAxe, you can lower your churn and increase your revenue automatically, all in just minutes!" />
        <meta property="og:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta property="og:url" content={`https://churnaxe.com/`}/>

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

        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9ZBWR1SD0H"></script>
        <script dangerouslySetInnerHTML={{
            __html:`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
        
            gtag('config', 'G-9ZBWR1SD0H');`
        }} /> 

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
      
        <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: `{
          "@context": "https://schema.org/",
          "@type": "WebSite",
          "name": "ChurnAxe - Cut Down Churn, Automatically!",
          "url": "https://churnaxe.com/"
        }`
        }} 
      />
      </Head>
      <NHeader />
      <Flex as="main" mx="auto" mt={0} px={5}>
        <Container maxW={'7xl'}>
        <Stack
            align={'center'}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
            textAlign={{base:"center",md:"left"}}
            direction={{ base: 'column', md: 'row' }}>
            <Stack flex={1} spacing={3}>
            <Heading mb={2}
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                <Text
                as={'span'}
                fontFamily={"'Montserrat', sans-serif!important"}
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
            fontFamily={"'Montserrat', sans-serif!important"} as={'span'} color={'blue.400'}>
                Automatically!
                </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={"lg"}
            fontFamily={"'Montserrat', sans-serif!important"}>
                With <strong>ChurnAxe</strong>, you can <strong>lower your churn and increase your revenue</strong> by automatically sending recovery emails to churned subscribers!
            </Text>
            <Stack
                spacing={{ base: 4, sm: 3 }}
                mt={2}
                justifyContent={{base:"center",md:"left"}}
                direction={{ base: 'column', sm: 'row' }}>
                <Link href="/sign-up" _hover={{ textDecoration:"none" }}><Button
                rounded={'lg'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                colorScheme={'red'}
                fontFamily={"'Montserrat', sans-serif!important"}
                bg={'blue.400'}
                rightIcon={<FaArrowRight size={16} />}
                _hover={{ bg: 'blue.500' }}>
                Get Started
                </Button></Link>
                <Link href="/#Features" _hover={{ textDecoration:"none" }}><Button
                rounded={'lg'}
                size={'lg'}
                fontFamily={"'Montserrat', sans-serif!important"}
                fontWeight={'normal'}
                px={6}>
                Learn More
                </Button></Link>
            </Stack>
            </Stack>
            <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            fontFamily={"'Montserrat', sans-serif!important"}
            w={'full'}>
            <Box
                position={'relative'}
                height={'300px'}
                rounded={'2xl'}
                boxShadow={'2xl'}
                width={'full'}
                overflow={'hidden'}>
                <Image
                alt={'ChurnAxe'}
                fit={'cover'}
                align={'top'}
                w={'100%'}
                h={'100%'}
                src={
                  '/s/i/CA-Dashboard.webp'
                }
                />
            </Box>
            </Flex>
        </Stack>
        <Flex mt={12} w={"100%"} alignItems="center" mb={8} flexDirection="column">
            <Heading fontFamily={"'Montserrat', sans-serif!important"} fontWeight={500} fontSize={"3xl"} textAlign="center">How <Text as="span" color={"blue.400"}>ChurnAxe</Text> Works</Heading>
            <Text fontFamily={"'Montserrat', sans-serif!important"} color={'gray.500'} fontSize={"lg"} maxWidth={600} textAlign="center" mt={4}>ChurnAxe makes recovering churned subscribers simple! Recovery emails <strong>are sent automatically</strong> to customers soon after they unsubscribe, leading to re-subscriptions.</Text>
        </Flex>
        <Box p={4} mb={12} id="Features">
            <SimpleGrid mb={16} columns={{ base: 1, md: 3 }} spacing={10}>
                <Feature
                icon={<Icon as={FcLineChart} w={10} h={10} />}
                title={'Track Statistics'}
                text={
                    'Get valuable insights on business performance, churn rates, and recovery email events - all in your dashboard.'
                }
                />
                <Feature
                icon={<Icon as={FcFeedback} w={10} h={10} />}
                title={'Recovery Emails'}
                text={
                    'ChurnAxe automatically sends emails to churned subscribers in an attempt to recover lost revenue.'
                }
                />
                <Feature
                icon={<Icon as={FcDataSheet} w={10} h={10} />}
                title={'Manage Subscribers'}
                text={
                    'See which subscribers have churned and manage the recovery process for each individual customer.'
                }
                />
            </SimpleGrid>
            </Box>
            <Stack
            align={'center'}
            spacing={{ base: 8, md: 5 }}
            py={{ base: 10, md: 14 }}
            direction={{ base: 'column', md: 'row' }}>
                <Flex flex={1} alignItems="start" flexDirection="column">
                    <Heading fontFamily={"'Montserrat', sans-serif!important"} fontWeight={500} fontSize={"3xl"}>Recover <Text as="span" color={"blue.400"}>Lost Revenue</Text></Heading>
                    <Text fontFamily={"'Montserrat', sans-serif!important"} color={'gray.500'} fontSize={"lg"} maxWidth={600} textAlign="left" mt={4}>ChurnAxe automatically tries to <strong>recover churned subscribers and lost revenue</strong>, with no additional effort required from you. You make the email, <strong>ChurnAxe does the rest</strong>!</Text>
                    <Stat mt={4} color={'gray.500'} fontSize={"xl"}>
                        <StatNumber color={'green.500'} fontSize={"3xl"}>+ 16.3%</StatNumber>
                        <StatHelpText>
                            Avg. Revenue Increase (In 30 Days)
                        </StatHelpText>
                    </Stat>
                </Flex>
                <Box
                flex={1}
                position={'relative'}
                height={'300px'}
                rounded={'2xl'}
                boxShadow={'2xl'}
                width={'full'}
                overflow={'hidden'}>
                    <Image
                    alt={'Recover Revenue'}
                    fit={'cover'}
                    align={'top'}
                    w={'100%'}
                    h={'100%'}
                    src={
                        '/s/i/CA-Recover.webp'
                    }
                    />
                </Box>
            </Stack>
            <Stack
            align={'center'}
            spacing={{ base: 8, md: 12 }}
            py={{ base: 10, md: 14 }}
            direction={{ base: 'column', md: 'row' }}>
                <Box
                flex={1}
                position={'relative'}
                height={'300px'}
                rounded={'2xl'}
                boxShadow={'2xl'}
                width={'full'}
                overflow={'hidden'}>
                  <Image
                  alt={'Track Statistics'}
                  fit={'cover'}
                  align={'top'}
                  w={'100%'}
                  h={'100%'}
                  src={
                    '/s/i/CA-Stats.webp'
                  }
                  />
                </Box>
                <Flex flex={1} alignItems="start" flexDirection="column">
                    <Heading fontFamily={"'Montserrat', sans-serif!important"} fontWeight={500} fontSize={"3xl"}>Track Every <Text as="span" color={"blue.400"}>Statistic</Text></Heading>
                    <Text fontFamily={"'Montserrat', sans-serif!important"} color={'gray.500'} fontSize={"lg"} maxWidth={600} textAlign="left" mt={4}>With <strong>essential, real-time statistics</strong>, ChurnAxe makes analyzing business performance simple and efficient. Track <strong>MRR, ARR, churn rate, and more statistics</strong> all in a single page!</Text>
                </Flex>
            </Stack>
            <Stack
            align={'center'}
            spacing={{ base: 8, md: 12 }}
            py={{ base: 10, md: 14 }}
            direction={{ base: 'column', md: 'row' }}>
                <Flex flex={1} alignItems="start" flexDirection="column">
                    <Heading fontFamily={"'Montserrat', sans-serif!important"} fontWeight={500} fontSize={"3xl"}>Manage <Text as="span" color={"blue.400"}>Churned Customers</Text></Heading>
                    <Text fontFamily={"'Montserrat', sans-serif!important"} color={'gray.500'} fontSize={"lg"} maxWidth={600} textAlign="left" mt={4}>See <strong>when customers churn, manage the recovery process, and gain valuable insights</strong> into why your customers unsubscribe. ChurnAxe makes <strong>customer management simple</strong>.</Text>
                </Flex>
                <Box
                flex={1}
                position={'relative'}
                height={'300px'}
                rounded={'2xl'}
                boxShadow={'2xl'}
                width={'full'}
                overflow={'hidden'}>
                  <Image
                  alt={'Churned Customers'}
                  fit={'cover'}
                  align={'top'}
                  w={'100%'}
                  h={'100%'}
                  src={
                    '/s/i/CA-Churn.webp'
                  }
                  />
                </Box>
            </Stack>
            <Flex id="Pricing" mt={12} pt={12} w={"100%"} alignItems="center" mb={8} flexDirection="column">
              <Heading fontFamily={"'Montserrat', sans-serif!important"} fontWeight={500} fontSize={"3xl"} textAlign="center"><Text as="span" color={"blue.400"}>Pricing</Text></Heading>
              <Text fontFamily={"'Montserrat', sans-serif!important"} color={'gray.500'} fontSize={"lg"} maxWidth={600} textAlign="center" mt={4}>We work on a simple, easy to follow subscription model. You <strong>can cancel at anytime</strong>, and re-subscribe when you choose.</Text>
            </Flex>
            <Pricing />
            <Flex mt={12} py={14} w={"100%"} alignItems="center" mb={8} flexDirection="column">
              <Heading fontFamily={"'Montserrat', sans-serif!important"} fontWeight={500} fontSize={"3xl"} textAlign="center"><Text as="span" color={"blue.400"}>Ready To Start?</Text></Heading>
              <Text fontFamily={"'Montserrat', sans-serif!important"} color={'gray.500'} fontSize={"lg"} maxWidth={600} textAlign="center" mt={4}>Give ChurnAxe a try and start <strong>recovering churned subscribers today</strong>! Don&apos;t like it? No problem - you can cancel at anytime.</Text>
              <Link
                mt={12} href="/sign-up" _hover={{ textDecoration:"none" }}><Button
                rounded={'lg'}
                size={'lg'}
                maxWidth="400px"
                width={"100%"}
                fontWeight={'normal'}
                px={6}
                colorScheme={'red'}
                fontFamily={"'Montserrat', sans-serif!important"}
                bg={'blue.400'}
                rightIcon={<FaArrowRight size={16} />}
                _hover={{ bg: 'blue.500' }}>
                Get Started
                </Button></Link>
            </Flex>
        </Container>
      </Flex>
      <Footer />
    </div>
  )
}