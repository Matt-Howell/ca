import Head from 'next/head'
import {  Box, Text, Heading,
    Flex, Breadcrumb, BreadcrumbLink, BreadcrumbItem, Image, UnorderedList,
    ListItem, ListIcon, Link, Button
} from "@chakra-ui/react";
import NHeader from '../../components/NHeader'
import Footer from '../../components/Footer'
import { FaChevronRight, FaClock, FaArrowRight } from 'react-icons/fa'

export default function Tutorial() { 
  return (
    <div>
      <Head>       
        <link rel="canonical" href="https://churnaxe.com/tutorials/email-settings" />

        <title>Changing Email Settings - ChurnAxe</title>
        <meta name="description" content="Maximize customer retention and revenue growth with ChurnAxe. This tutorial guides you through customizing recovery email settings for optimal impact in just a few simple steps." />
        
        <meta name="twitter:title" content="Changing Email Settings - ChurnAxe" />
        <meta name="twitter:description" content="Maximize customer retention and revenue growth with ChurnAxe. This tutorial guides you through customizing recovery email settings for optimal impact in just a few simple steps." />
        <meta name="twitter:image" content="https://churnaxe.com/s/i/tutorials/email-settings.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://churnaxe.com/tutorials/email-settings`}/>
        
        <meta property="og:title" content="Changing Email Settings - ChurnAxe" />
        <meta property="og:description" content="Maximize customer retention and revenue growth with ChurnAxe. This tutorial guides you through customizing recovery email settings for optimal impact in just a few simple steps." />
        <meta property="og:image" content="https://churnaxe.com/s/i/tutorials/email-settings.webp" />
        <meta property="og:url" content={`https://churnaxe.com/tutorials/email-settings`}/>
        
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
            <Flex pb={12} px={{ base:4, md:0 }} width="100%" pt={10} justifyContent={"center"}>
                <Flex justifyContent={"start"} width="100%" flexDirection={{ base:"column", md:"row" }} maxWidth={"1392px"}>
                    <Flex flexDirection={"column"} justifyContent={"start"} width={{ base:"100%", md:"70%" }} px={{ base:"none", md:4 }}>
                        <Breadcrumb spacing='8px' separator={<FaChevronRight size={12} opacity='0.8' color='gray.500' />}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/tutorials/' _hover={{ textDecoration:"none", opacity:0.9 }} opacity={0.8}>Tutorials</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem isCurrentPage>
                                <BreadcrumbLink textOverflow={'ellipsis'} href='/tutorials/email-settings' _hover={{ textDecoration:"none" }}>Changing Email Settings...</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <Heading 
                        as="h1"
                        fontFamily={'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"'}
                        mt={5}
                        fontWeight={500}
                        pb={5}
                        boxShadow={"rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset"}
                        >
                            Changing Email Settings 
                        </Heading>
                        <Image alt='Changing Email Settings' src="https://cdn.churnaxe.com/s/i/email-settings.webp" mt={5} borderRadius='6px' border={"1px solid rgba(0, 0, 0, 0.1)"} />
                        <Heading 
                        as="h3"
                        fontFamily={'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"'}
                        mt={7}
                        fontWeight={500}
                        fontSize={'2xl'}
                        color={"gray.600"}
                        pb={3}
                        boxShadow={"rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset"}
                        >
                            Settings
                        </Heading>
                        <Text color={"gray.600"} whiteSpace={"pre-line"} mt={4} fontSize={'1.075rem'} lineHeight={1.65}>
                        ChurnAxe is a powerful tool designed to help businesses reduce churn and boost revenue by automatically sending recovery emails to subscribers who have churned. 
                        <br /><br />
                        In this tutorial, we will guide you through the process of using the settings page to customize and optimize your recovery email strategy.
                        </Text>
                        <UnorderedList spacing={3} mt={4} fontSize={'1.075rem'} lineHeight={1.65}>
                            <ListItem fontWeight={600} display={'flex'} alignItems="center" listStyleType={'none'}><ListIcon as={FaChevronRight} fontSize="md" opacity={0.8} />Accessing ChurnAxe</ListItem>
                            <Text color={"gray.600"} whiteSpace={"pre-line"} mt={4} fontSize={'1.075rem'} lineHeight={1.65}>
                                Register and set up your ChurnAxe account then become a member through the button in the dashboard upon logging in.
                                <br /><br />
                                <strong>ChurnAxe is an $8.00 a month subscription</strong> - you can cancel at any time for no extra cost.
                            </Text>
                        </UnorderedList>
                        <UnorderedList spacing={3} mt={6} fontSize={'1.075rem'} lineHeight={1.65}>
                            <ListItem fontWeight={600} display={'flex'} alignItems="center" listStyleType={'none'}><ListIcon as={FaChevronRight} fontSize="md" opacity={0.8} />Editing Sender Information</ListItem>
                            <Text color={"gray.600"} whiteSpace={"pre-line"} mt={4} fontSize={'1.075rem'} lineHeight={1.65}>
                            Click on the &quot;Settings&quot; tab in the main menu to access the email settings page.
                            <br /><br />
                            In the &quot;Sending Settings&quot; section, customize the sender name and email address to make recovery emails more personalized and trustworthy.
                            </Text>
                        </UnorderedList>
                        <UnorderedList spacing={3} mt={6} fontSize={'1.075rem'} lineHeight={1.65}>
                            <ListItem fontWeight={600} display={'flex'} alignItems="center" listStyleType={'none'}><ListIcon as={FaChevronRight} fontSize="md" opacity={0.8} />Timing Settings</ListItem>
                            <Text color={"gray.600"} whiteSpace={"pre-line"} mt={4} fontSize={'1.075rem'} lineHeight={1.65}>
                                Adjust the &quot;Send After&quot; setting to specify the number of hours after a customer has churned before ChurnAxe sends the recovery email. Experiment with different time intervals to find the optimal moment for engagement.
                            </Text>
                        </UnorderedList>
                        <UnorderedList spacing={3} mt={6} fontSize={'1.075rem'} lineHeight={1.65}>
                            <ListItem fontWeight={600} display={'flex'} alignItems="center" listStyleType={'none'}><ListIcon as={FaChevronRight} fontSize="md" opacity={0.8} />Designing Recovery Emails</ListItem>
                            <Text color={"gray.600"} whiteSpace={"pre-line"} mt={4} fontSize={'1.075rem'} lineHeight={1.65}>
                                Navigate to the email design section and utilize the intuitive drag-and-drop designer to create compelling recovery emails.
                                <br /><br />
                                Customize the content, layout, and visuals to align with your brand identity and effectively communicate value to churned customers.
                            </Text>
                        </UnorderedList>
                        <br />
                        <Text color={"gray.600"} whiteSpace={"pre-line"} mt={4} fontSize={'1.075rem'} lineHeight={1.65}>
                        By leveraging ChurnAxe&apos;s settings page, you can fine-tune your recovery email approach, maximize customer retention, and recover lost revenue effortlessly. Regularly monitor and adjust these settings to optimize your strategy and <strong>keep your business thriving</strong>.
                        </Text>
                        <Flex mt={12} pt={14} pb={0} w={"100%"} alignItems="center" mb={8} flexDirection="column">
                            <Heading fontFamily={"'Montserrat', sans-serif!important"} fontWeight={500} fontSize={"3xl"} textAlign="center"><Text as="span" color={"blue.400"}>Ready To Start?</Text></Heading>
                            <Text fontFamily={"'Montserrat', sans-serif!important"} color={'gray.500'} fontSize={"lg"} maxWidth={600} textAlign="center" mt={4}>Give ChurnAxe a try and start <strong>recovering churned subscribers today</strong>! Don&apos;t like it? No problem - you can cancel at anytime.</Text>
                            <Link href="/sign-up" _hover={{ textDecoration:"none" }}>
                                <Button
                                rounded={'lg'}
                                size={'lg'}
                                maxWidth="400px"
                                mt={12}
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
                        </Flex>
                    <Box px={4} mt={{ base:6, md:0 }} justifyContent={"start"} width={{ base:"100%", md:"30%" }}>
                        <Flex direction={"column"} p={6} borderRadius='6px' border={"1px solid rgba(0, 0, 0, 0.1)"}>
                            <Heading 
                            as="h3"
                            fontFamily={'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"'}
                            fontWeight={500}
                            fontSize={'xl'}
                            width="100%"
                            pb={3}
                            boxShadow={"rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset"}
                            >
                                Post Summary
                            </Heading>
                            <UnorderedList spacing={3} mt={4} fontSize={'1.075rem'} mx={0} lineHeight={1.65}>
                                <ListItem fontWeight={600} display={'flex'} flexWrap="wrap" alignItems="center" listStyleType={'none'}>
                                    Changing Email Settings
                                </ListItem>
                                <ListItem display={'flex'} flexWrap="wrap" alignItems="center" listStyleType={'none'}>                                
                                    Maximize customer retention and revenue growth with ChurnAxe. This tutorial guides you through customizing recovery email settings for optimal impact in just a few simple steps.
                                </ListItem>
                                <ListItem display={'flex'} flexWrap="wrap" alignItems="center" listStyleType={'none'}>
                                    <ListIcon as={FaClock} fontSize="md" opacity={0.8} />
                                    <strong>Last Updated:&nbsp;</strong> 26 December, 2023
                                </ListItem>
                            </UnorderedList>
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
        </Box>
      <Footer />
    </div>
  )
}