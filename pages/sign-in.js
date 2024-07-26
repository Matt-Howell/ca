import Head from 'next/head'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useToast,
  InputRightElement,
  InputGroup,
  Divider
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import NHeader from '../components/NHeader'
import Footer from '../components/Footer'
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { supabase } from '../components/utils/supabase.js'
import { FcGoogle } from 'react-icons/fc'

export default function SignIn() {  
  const router = useRouter();
  const toast = useToast()
  const userEmail = useRef("");
  const userPass = useRef("");
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  useEffect(() => {
    (async () => { 
      if ((await supabase.auth.getSession()).data.session) {
        const id = 'redir-toast'
        if (!toast.isActive(id)) {
          toast({
            id,
            title: "Redirecting...",
            description: "You are already signed in!",
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

  const signInEP = async () => {
    try {
      let email = String(userEmail.current.value)
      let password = String(userPass.current.value)
      const { data, error } = await supabase.auth.signInWithPassword({ email, password }, { redirectTo:"https://churnaxe.com/dashboard" })
      if (error) {
        toast({
          title: "Whoops!",
          description: String(error.message),
          status: "error",
          position: "top-end",
          duration: 7500,
          isClosable: true,
        })
      }
      if (data.user) {
        toast({
          title: "Signed In!",
          description: "You are now signed into your account.",
          status: "success",
          position: "top-end",
          duration: 7500,
          isClosable: true,
        })
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function signInGoogle() {
    try {
      let provider = 'google'
      let { error, user } = await supabase.auth.signInWithOAuth({ provider: provider, options: {
        redirectTo:'https://churnaxe.com/dashboard'
      }})
      if (error) {
        toast({
          title: "Whoops!",
          description: String(error.message),
          status: "error",
          position: "top-end",
          duration: 7500,
          isClosable: true,
        })
      }
      if (user) {
        toast({
          title: "Signed In!",
          description: "You have signed into your account using Google.",
          status: "success",
          position: "top-end",
          duration: 7500,
          isClosable: true,
        })
        router.push('/dashboard')
      }
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div>
      <Head>
        <link rel="canonical" href="https://churnaxe.com/sign-in" />

        <title>Sign In - ChurnAxe</title>
        <meta name="description" content="Sign back into your account to keep cutting down your churn." />

        <meta name="twitter:title" content="Sign In - ChurnAxe" />
        <meta name="twitter:description" content="Sign back into your account to keep cutting down your churn." />
        <meta name="twitter:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://churnaxe.com/sign-in`}/>

        <meta property="og:title" content="Sign In - ChurnAxe" />
        <meta property="og:description" content="Sign back into your account to keep cutting down your churn." />
        <meta property="og:image" content="https://churnaxe.com/s/i/CA-512.png" />
        <meta property="og:url" content={`https://churnaxe.com/sign-in`}/>

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
      <Flex as="main" mx="auto" mt={6} px={5}>
        <Flex flexDirection={"column"} w={"100%"} align={'center'} justify={'center'} py={6} mx="auto" maxWidth={"1200px"}>
            <Flex
                flexDirection={"column"}>
                <Stack spacing={5} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                    <Heading fontFamily={"'Montserrat',sans-serif!important"} textAlign="center" fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontFamily={"'Montserrat',sans-serif!important"} textAlign="center" fontSize={'lg'} color={'gray.600'}>
                        to get to your dashboard! 🪓
                    </Text>
                    </Stack>
                    <Box
                    rounded={'lg'}
                    bg={'#fafafa'}
                    boxShadow={'lg'}
                    p={8}>
                    <Button borderWidth={"1px"} fontFamily={"'Montserrat',sans-serif!important"} onClick={signInGoogle} w={'full'} _hover={{ opacity:0.8 }} backgroundColor={'white'} color={'#757575'} leftIcon={<FcGoogle />}>
                      Sign in with Google
                    </Button>
                  <Divider my={4} />
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        signInEP()
                    }}>
                    <Stack spacing={4}>
                            <FormControl id="email" isRequired>
                            <FormLabel fontFamily={"'Montserrat',sans-serif!important"}>Email address</FormLabel>
                            <Input fontFamily={"'Montserrat',sans-serif!important"} ref={userEmail} type="email" />
                            </FormControl>
                            <FormControl id="password" isRequired>
                            <FormLabel fontFamily={"'Montserrat',sans-serif!important"}>Password</FormLabel>
                            <InputGroup><Input fontFamily={"'Montserrat',sans-serif!important"} type={show ? "text" : "password"} ref={userPass} />
                            <InputRightElement w={'fit-content'} mr={2}>
                                <Button size="sm" background={'none'} onClick={handleClick}>
                                {show ? <FaEyeSlash size={15} opacity={1} /> : <FaEye size={15} opacity={1} /> }
                                </Button>
                            </InputRightElement></InputGroup>
                            </FormControl>
                            <Stack spacing={5}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                type='submit'
                                fontFamily={"'Montserrat',sans-serif!important"}
                                _hover={{
                                bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        <Text fontFamily={"'Montserrat',sans-serif!important"} textAlign='center'>Don&apos;t have an account? <Link href="/sign-up" _hover={{ textDecoration:"none", opacity:0.8 }} color={'blue.300'}>Create one</Link>.</Text>
                        <Text fontFamily={"'Montserrat',sans-serif!important"} textAlign='center'>Forgotten your password? <Link href="/reset-password" _hover={{ textDecoration:"none", opacity:0.8 }} color={'blue.300'}>Reset it</Link>.</Text>
                        </Stack></Stack>
                        </form>
                    </Box>
                </Stack>
            </Flex>
        </Flex>
      </Flex>
      <Footer />
    </div>
  )
}