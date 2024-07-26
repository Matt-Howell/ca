import { 
  Flex,
  Text,
  Heading,
  Button,
  Box,
  Stack,
  HStack,
  VStack,
  List,
  ListItem,
  ListIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
} from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'

function PriceWrapper({ children }) {
  return (
    <Flex
      flexDirection="column"
      mb={4}
      shadow="base"
      borderWidth="1px"
      maxWidth={450}
      height="100%"
      bg={'#fafafa'}
      flex={1}
      fontFamily={"'Montserrat', sans-serif!important"}
      alignSelf={{ base: 'center', md: 'flex-start' }}
      borderColor={'gray.200'}
      borderRadius={'xl'}>
      {children}
    </Flex>
  );
}

export default function Pricing() { 
  return (
    <div>
    <Flex py={1}>
      <Stack
        flexGrow="1"
        flexBasis="0"
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        flex={1}
        display="flex"
        spacing={{ base: 4, md: 10 }}
        py={8}>
        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-15px"
              display={{ base:"flex", md:"none", lg:"flex" }}
              left="50%"
              style={{ transform: 'translate(-50%)' }}>
              <Text
                textTransform="uppercase"
                bg={'#2c8fb054'}
                px={3}
                py={1}
                color={'gray.900'}
                fontSize="sm"
                fontWeight="600"
                rounded="xl">
                Cancel Anytime
              </Text>
            </Box>
            <Box pt={8} pb={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Subscription
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                8.00
              </Text>
            </HStack>
            <Text display="flex" alignItems="center" justifyContent="center" fontSize="xl" color="gray.500">
              Per Month
            </Text>
          </Box>
          <VStack
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="center" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Track churned customers
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Send automatic recovery emails
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Detailed dashboard and statistics
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
            <Link href="/sign-up" _hover={{ textDecoration:"none" }}><Button w="full" colorScheme="blue" variant="outline">
                Join Now
              </Button></Link>
            </Box>
            </VStack>
          </Box>
        </PriceWrapper>
      </Stack>
      </Flex>
      <Flex id='FAQ' mt={12} pt={12} w={"100%"} alignItems="center" mb={8} flexDirection="column">
         <Heading fontFamily={"'Montserrat', sans-serif!important"} fontWeight={500} fontSize={"3xl"} textAlign="center"><Text as="span" color={"blue.400"}>FAQ</Text></Heading>
         <Text fontFamily={"'Montserrat', sans-serif!important"} color={'gray.500'} fontSize={"lg"} maxWidth={600} textAlign="center" mt={4}>Have a question? <strong>Here are the questions we get the most</strong>, and if you&apos;re still unsure - then ask us directly!</Text>
        </Flex>
      <Flex justifyContent="center">
        <Accordion width={"100%"} maxWidth={700} allowToggle>
          <AccordionItem borderWidth={"1px 1px 0 1px"} borderRadius={"7.5px 7.5px 0 0"}>
            <AccordionButton p={5}>
              <Heading fontWeight={"400"} color={"blue.500"} fontFamily={"'Montserrat', sans-serif!important"} as="span" fontSize="lg" flex='1' textAlign='left'>
                What is ChurnAxe?
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel color={'gray.500'} pb={4}>
              ChurnAxe helps businesses <strong>keep customers from leaving and increase their revenue</strong>. It works by <strong>sending recovery emails automatically to subscribers</strong> who have churned, making it easier to bring them back. 
              <br /><br />
              With ChurnAxe, you can <strong>track important stats</strong> on a simple dashboard, <strong>manage subscribers</strong> who have left, and <strong>recover lost revenue</strong> without extra effort.
              <br /><br />
              <strong>All of this is included in the $8.00 a month subscription.</strong>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem borderWidth={"1px 1px 0 1px"}>
            <AccordionButton p={5}>
              <Heading fontWeight={"400"} color={"blue.500"} fontFamily={"'Montserrat', sans-serif!important"} as="span" fontSize="lg" flex='1' textAlign='left'>
                How can it help my business?
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel color={'gray.500'} pb={4}>           
            ChurnAxe helps your business by <strong>automatically sending emails</strong> to bring back customers who have unsubscribed, boosting your revenue. 
            <br /><br />
            Always know what is happening with key stats on an <strong>easy-to-use dashboard</strong>, giving you real-time insights into how your business is doing.
            <br /><br />
            With ChurnAxe, you can <strong>effortlessly manage subscribers</strong>, <strong>recover lost revenue</strong>, and <strong>make your business stronger</strong> without a lot of extra work.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem borderWidth={"1px 1px 0 1px"}>
            <AccordionButton p={5}>
              <Heading fontWeight={"400"} color={"blue.500"} fontFamily={"'Montserrat', sans-serif!important"} as="span" fontSize="lg" flex='1' textAlign='left'>
                Which statistics do you track?
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel color={'gray.500'} pb={4}>
              ChurnAxe <strong>tracks your MRR, ARR, churn rate, and more</strong> in real-time, giving you a complete insight into how your business is doing at all times!
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem borderWidth={"1px 1px 0 1px"} borderRadius={"0 0 7.5px 7.5px"}>
            <AccordionButton p={5}>
              <Heading fontWeight={"400"} color={"blue.500"} fontFamily={"'Montserrat', sans-serif!important"} as="span" fontSize="lg" flex='1' textAlign='left'>
                How much does it cost?
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel color={'gray.500'} pb={4}>
              ChurnAxe costs <strong>$8.00 a month</strong>, with no additional expenses or add-ons. There are <strong>no limits</strong> on business size, or the number of emails sent to customers.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem borderWidth={"1px 1px 0 1px"}>
            <AccordionButton p={5}>
              <Heading fontWeight={"400"} color={"blue.500"} fontFamily={"'Montserrat', sans-serif!important"} as="span" fontSize="lg" flex='1' textAlign='left'>
                What payment methods are available?
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel color={'gray.500'} pb={4}>
              We use Stripe to securely manage payments, allowing us to support <strong>Google & Apple Pay, as well as all major card providers</strong>.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem borderWidth={"1px 1px 0 1px"}>
            <AccordionButton p={5}>
              <Heading fontWeight={"400"} color={"blue.500"} fontFamily={"'Montserrat', sans-serif!important"} as="span" fontSize="lg" flex='1' textAlign='left'>
                Can I cancel my subscription?
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel color={'gray.500'} pb={4}>
              Yes, you can cancel your subscription whenever you want to. <br /><br />
              When you cancel your subscription before the next payment is due, you <strong>will still be subscribed until your subscription ends and you will not be charged</strong>.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </div>
  )
}