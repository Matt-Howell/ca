import Head from 'next/head'
import { Flex, Text, useToast,
  Heading,
  Button,
  IconButton,
  Divider,
  Box,
  Stack,
  FormControl,
  Container,
  Link,
  Input,
  FormLabel,
  useClipboard,
  Textarea,
  Tooltip
} from '@chakra-ui/react'
import NHeader from '../components/NHeader'
import Footer from '../components/Footer.jsx'
import { FaPaperPlane } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { BsTwitter } from 'react-icons/bs'
import { useEffect } from 'react'

export default function Contact() { 
  const { hasCopied, onCopy } = useClipboard('help@churnaxe.com');
  const toast = useToast()

  useEffect(() => {
    let param = new URL(window.location.href).searchParams.get("m")
    if (param != null) {
      toast({
        title: "Message Sent 📨",
        description: "Thank you for your message - we will get back to you as soon as we can!",
        status: "success",
        position: "top-end",
        duration: 7500,
        isClosable: true,
      })
    }
  }, [])

  return (
    <div>
      <Head>
        <link rel="canonical" href="https://churnaxe.com/contact" />

        <title>Contact Us - ChurnAxe</title>
        <meta name="description" content="Have a question, need some help, or just want to talk about ChurnAxe? Reach out to us here. We will get back to you within 1 to 2 hours!" />
        
        <meta name="twitter:title" content="Contact Us - ChurnAxe" />
        <meta name="twitter:description" content="Have a question, need some help, or just want to talk about ChurnAxe? Reach out to us here. We will get back to you within 1 to 2 hours!" />
        <meta name="twitter:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://churnaxe.com/contact`}/>
        
        <meta property="og:title" content="Contact Us - ChurnAxe" />
        <meta property="og:description" content="Have a question, need some help, or just want to talk about ChurnAxe? Reach out to us here. We will get back to you within 1 to 2 hours!" />
        <meta property="og:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta property="og:url" content={`https://churnaxe.com/contact`}/>
        
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
                  Contact Us
                </Heading>
                <Text lineHeight={1.5} color={'gray.500'} fontSize="1.25rem" maxW={'3xl'}>
                    Have a question, need some help, or just want to talk about what we offer? Reach out to us here. We will get back to you within 1 to 2 hours!
                </Text>
              </Stack>
            </Container>
          </Box>
          <Container pt={8} px={7} maxW={'1000px'}>
            <form action="https://churnaxe.com/sendMessage.php" method="POST">
                <FormControl mb={4} id="first-name" isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input name="uName" className="customBack" type="text" placeholder="Full Name" />
                </FormControl>
                <FormControl mb={4} id="first-name" isRequired>
                    <FormLabel>Email Address</FormLabel>
                    <Input name="uEmail" className="customBack" type="email" placeholder="Email Address" />
                </FormControl>
                <FormControl mb={4} id="first-name" isRequired>
                    <FormLabel>Message</FormLabel>
                    <Textarea minHeight={150} name="uMessage" className="customBack" placeholder="Your message..." />
                </FormControl>
                <Input name="uVerif" type="hidden" value="true" />
                <Button w={"100%"} mt={2} type="submit" rightIcon={<FaPaperPlane />} colorScheme="green" variant="solid">
                  Send
                </Button>
            </form>
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
                textAlign={"center"} p={2} borderRadius={"md"}
                label={hasCopied ? 'Email Copied!' : 'Copy Email'}
                closeOnClick={false}>
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