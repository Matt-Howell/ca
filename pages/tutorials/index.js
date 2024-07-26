import Head from 'next/head'
import {
  Container,
  Heading,
  Text,
  Stack,
  Box,
  useClipboard,
  Tooltip,
  IconButton,
  Link,
  Divider,
  Flex,
  Card,
  CardBody,
  CardHeader
} from "@chakra-ui/react";
import NHeader from '../../components/NHeader'
import Footer from '../../components/Footer'
import { MdEmail } from 'react-icons/md'
import { BsTwitter } from 'react-icons/bs'

export default function Tutorials() { 
  const { hasCopied, onCopy } = useClipboard('help@churnaxe.com');
  
  const popBack = "#fafafa";

  return (
    <div>
      <Head>
        <link rel="canonical" href="https://churnaxe.com/tutorials/" />

        <title>Tutorials - ChurnAxe</title>
        <meta name="description" content="Learn more about using ChurnAxe to the best of its ability right here with our detailed tutorials!" />

        <meta name="twitter:title" content="Tutorials - ChurnAxe" />
        <meta name="twitter:description" content="Learn more about using ChurnAxe to the best of its ability right here with our detailed tutorials!" />
        <meta name="twitter:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://churnaxe.com/tutorials/`}/>

        <meta property="og:title" content="Tutorials - ChurnAxe" />
        <meta property="og:description" content="Learn more about using ChurnAxe to the best of its ability right here with our detailed tutorials!" />
        <meta property="og:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta property="og:url" content={`https://churnaxe.com/tutorials/`}/>

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
      </Head>
      <NHeader />
      <Box as='main'>
          <Box width="100%" padding="1rem 0" bg={'#f0f5f9'}>
            <Container maxW={'5xl'}>
              <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 2, md: 3 }}
                py={{ base: 10, md: 14 }}>
                <Heading
                  fontWeight={600}
                  as="h1"
                  mb={3}
                  fontFamily={"'Montserrat', sans-serif!important"}
                  fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
                  lineHeight={'110%'}>
                  Tutorials
                </Heading>
                <Text lineHeight={1.5} color={'gray.500'} fontSize="1.25rem" maxW={'3xl'}>
                Learn more about using ChurnAxe to the best of its ability right here with our detailed tutorials 📖
                </Text>
              </Stack>
            </Container>
          </Box>
          <Container pt={5} maxW={'1500px'}>
          <Heading
            color={"gray.600"}
            fontSize={'xl'}
            pb={'0.8rem'}
            textAlign={'left'}
            mb={4}
            fontFamily={"'Montserrat', sans-serif!important"}
            borderBottom={'1px solid #00000025'}>All Our Tutorials</Heading>
          <Text mb={8} color={"gray.600"} fontSize={"lg"}>We add new tutorials and guides all the time, but right now you can read through each of these to get an advanced understanding of ChurnAxe.</Text>
          <Stack display={"flex"} width={"100%"} spacing={4}>
            <Card pb={0} backgroundColor={popBack}>
                <CardHeader pb={0} mb={0}>
                    <Heading fontFamily={"'Montserrat', sans-serif!important"} color={"gray.600"} size='md'><Link href="/tutorials/email-settings" _hover={{ textDecoration:"none", opacity:0.8 }} color={'blue.300'}>Chaning Email Settings</Link></Heading>
                </CardHeader>
                <CardBody pt={4}>
                <Text fontFamily={"'Montserrat', sans-serif!important"} color={"gray.600"}>Maximize customer retention and revenue growth with ChurnAxe. This tutorial guides you through customizing recovery email settings for optimal impact in just a few simple steps.</Text>
                </CardBody>
            </Card>
            <Card pb={0} backgroundColor={popBack}>
                <CardHeader pb={0} mb={0}>
                    <Heading fontFamily={"'Montserrat', sans-serif!important"} color={"gray.600"} size='md'><Link href="/tutorials/statistics" _hover={{ textDecoration:"none", opacity:0.8 }} color={'blue.300'}>Analyzing Statistics</Link></Heading>
                </CardHeader>
                <CardBody pt={4}>
                <Text fontFamily={"'Montserrat', sans-serif!important"} color={"gray.600"}>Master ChurnAxe analytics for data-driven customer retention. Explore MRR, ARR trends, and churn rates to boost revenue effortlessly.</Text>
                </CardBody>
            </Card>
          </Stack>
          <Divider my={8} />
            <Flex flexDirection={"row"} width={"100%"} justifyContent={"center"}>
              <Link href="https://twitter.com/churnaxe">
                <IconButton
                  aria-label="twitter"
                  variant="ghost"
                  size="lg"
                  icon={<BsTwitter size="28px" />}
                  _hover={{
                    bg: 'blue.500',
                    color: 'white',
                  }}
                  isRound
                />
              </Link>
              <Tooltip
                label={hasCopied ? 'Email Copied!' : 'Copy Email'}
                closeOnClick={false}
                hasArrow>
                <IconButton
                  ml={4}
                  onClick={onCopy}
                  aria-label="Email"
                  variant="ghost"
                  size="lg"
                  icon={<MdEmail size="28px" />}
                  _hover={{
                    bg: 'blue.500',
                    color: 'white',
                  }}
                  isRound
                />
              </Tooltip>
              </Flex>
        </Container>
        </Box>
      <Footer />
    </div>
  )
}