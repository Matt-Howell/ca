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
  Flex
} from "@chakra-ui/react";
import NHeader from '../components/NHeader'
import Footer from '../components/Footer.jsx'
import { MdEmail } from 'react-icons/md'
import { BsTwitter } from 'react-icons/bs'

export default function About() { 
  const { hasCopied, onCopy } = useClipboard('help@churnaxe.com');

  return (
    <div>
      <Head>
        <link rel="canonical" href="https://churnaxe.com/about" />

        <title>About Us - ChurnAxe</title>
        <meta name="description" content="Want to learn more about ChurnAxe and what we do? Feel free to read about our product here!" />

        <meta name="twitter:title" content="About Us - ChurnAxe" />
        <meta name="twitter:description" content="Want to learn more about ChurnAxe and what we do? Feel free to read about our product here!" />
        <meta name="twitter:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://churnaxe.com/about`}/>

        <meta property="og:title" content="About Us - ChurnAxe" />
        <meta property="og:description" content="Want to learn more about ChurnAxe and what we do? Feel free to read about our product here!" />
        <meta property="og:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta property="og:url" content={`https://churnaxe.com/about`}/>

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
                  fontFamily={'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"'}
                  fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
                  lineHeight={'110%'}
                  color={'gray.800'}>
                  About Us
                </Heading>
                <Text lineHeight={1.5} color={'gray.500'} fontSize="1.25rem" maxW={'3xl'}>
                Want to learn more about ChurnAxe and what we do? Feel free to read about our product here!
                </Text>
              </Stack>
            </Container>
          </Box>
          <Container pt={5} maxW={'1200px'}>
          <Heading
            color={"gray.600"}
            fontSize={'xl'}
            pb={'0.8rem'}
            textAlign={'left'}
            mb={4}
            fontFamily={'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"'}
            borderBottom={'1px solid #00000025'}>Who Are We?</Heading>
          <Text mb={12} color={"gray.600"} fontSize={"lg"}>ChurnAxe makes recovering churned subscribers simple! Recovery emails are sent automatically to customers soon after they unsubscribe, leading to re-subscriptions. With ChurnAxe, you can effortlessly manage subscribers, recover lost revenue, and make your business stronger without a lot of extra work.
          <br /><br />
          ChurnAxe was founded by myself, <Link href="https://mjh.codes/" _hover={{ textDecoration:"none", opacity:0.8 }} color={'blue.300'}>Matthew</Link>, a SaaS owner and developer for the past 4 years.
          </Text>
          <Heading
            color={"gray.600"}
            fontSize={'xl'}
            pb={'0.8rem'}
            textAlign={'left'}
            mb={4}
            fontFamily={'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"'}
            borderBottom={'1px solid #00000025'}>What does ChurnAxe do?</Heading>
          <Text mb={12} color={"gray.600"} fontSize={"lg"}>
            ChurnAxe helps businesses <strong>keep customers from leaving and increase their revenue</strong>. It works by <strong>sending recovery emails automatically to subscribers</strong> who have churned, making it easier to bring them back. 
              <br /><br />
              With ChurnAxe, you can <strong>track important stats</strong> on a simple dashboard, <strong>manage subscribers</strong> who have left, and <strong>recover lost revenue</strong> without extra effort.
              <br /><br />
              <strong>All of this is included in the $8.00 a month subscription.</strong>
          </Text>
          <Heading
            color={"gray.600"}
            fontSize={'xl'}
            pb={'0.8rem'}
            textAlign={'left'}
            mb={4}
            fontFamily={'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"'}
            borderBottom={'1px solid #00000025'}>What&apos;s next for ChurnAxe?</Heading>
          <Text color={"gray.600"} fontSize={"lg"}>
            Every day we are improving, with new features being worked on all the time. Have a feature request? Let us know through Twitter or email.
          </Text>
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