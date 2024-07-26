import { useState, useRef, useEffect } from "react";
import {
  HStack,
  Link,
  Flex,
  IconButton,
  Button,
  Box,
  useToast,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Text,
  MenuDivider,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Stack,
  Collapse,
  useDisclosure,
  Icon,
  Tooltip
} from "@chakra-ui/react";
import { FaUserCircle, FaChevronRight, FaChevronDown, FaRegQuestionCircle, FaChevronUp } from "react-icons/fa";
import { IoMdClose } from 'react-icons/io'
import { RiMenuLine } from 'react-icons/ri'
import { MdOutlineExitToApp, MdShoppingCartCheckout } from 'react-icons/md'
import { useRouter }  from 'next/router'
import { supabase } from "./utils/supabase";

export default function Header() {
  const router = useRouter()
  const bg = "#fafafa"
  const ref = useRef();
  const toast = useToast();
  const [user, setUser] = useState()
  const [userType, setUserType] = useState("")  
  const [userBusinesses, setUserBusinesses] = useState([])  

  const cols = "gray.700"

  useEffect(() => {
    (async () => { 
      const { data: { user } } = await supabase.auth.getUser()
      setUserType(user.user_metadata.type)
      setUserBusinesses(user.user_metadata.businesses)
      setUser(user)
    })();
  }, [])

  const logOutSB = async () => {
    let { error } = await supabase.auth.signOut()
    if (error) {
      toast({
        title: "Whoops!",
        description: "An unknown error has occurred. Please try again in a few minutes.",
        status: "error",
        position: "top-end",
        duration: 7500,
        isClosable: true,
      })
    } else {
      toast({
        title: "Signed Out!",
        description: "You have successfully signed out from your account.",
        status: "success",
        position: "top-end",
        duration: 7500,
        isClosable: true,
      })
      router.reload()
    }
  }

  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
    <Flex flexDirection={"column"} as="header"
        borderBottomWidth={1}
        borderBottomColor={"gray.200"}
        bg={bg}>
      <Box
        ref={ref}
        transition="box-shadow 0.2s"
        bg={bg}
        zIndex={isOpen?15:null}
        w={"100%"}
        borderBottomWidth={1}
        borderBottomColor={"gray.200"}
      >
        <Box h="4.5rem" maxWidth={1400} mx="auto">
          <Flex
            h="full"
            px="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex flex={1}>
              <Link href="/dashboard">
                <HStack>
                  <svg width="157" height="27" viewBox="0 0 157 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.9665 15.4777C20.0045 15.5083 19.9848 15.4927 19.9665 15.4777ZM19.9665 15.4777C17.2865 13.1416 14.2123 11.7522 12.9434 11.1606C10.7023 16.3491 7.93434 21.3269 4.71234 25.965C4.30409 26.5527 3.50751 26.7378 2.89879 26.3864C2.83203 26.352 1.03595 25.0805 1.03595 25.0805C0.425048 24.6488 0.276054 23.7969 0.704193 23.1801C3.7155 18.8458 6.30582 14.196 8.4086 9.3503C8.22549 9.28165 7.99761 9.19755 7.99761 9.19755C7.25749 8.92127 6.90454 8.15562 7.1681 7.43691L9.19662 1.90021C9.58345 0.892401 10.5501 0.845318 11.4604 1.27629C11.7855 0.776063 12.4153 0.528252 13.0103 0.711002C13.0103 0.711002 14.9393 1.3124 15.1006 1.36428C15.86 1.60946 16.0615 2.34761 16.0083 2.83163C19.4548 3.85152 22.0124 4.05544 24.1549 4.01765C24.1903 6.2298 23.7699 8.54604 23.1141 10.3037C22.3164 12.4904 21.2035 13.9987 19.9665 15.4777ZM12.3588 1.94324C12.3349 2.01882 12.3103 2.09436 12.2861 2.16979L14.8065 3.04296C14.8381 2.94445 14.8703 2.84558 14.9016 2.74692C14.9298 2.65789 14.9301 2.46168 14.74 2.4039L12.684 1.76868C12.5483 1.72707 12.4024 1.80527 12.3588 1.94324ZM12.1486 10.2033L9.66564 9.22805C7.49171 14.3434 4.78347 19.249 1.61316 23.8119C1.53076 23.9307 1.55832 24.0941 1.67449 24.1761L3.43314 25.4152C3.56842 25.5103 3.73139 25.4374 3.80364 25.3333C7.09125 20.6008 9.89802 15.5113 12.1486 10.2033ZM16.3702 11.6409C17.429 9.75182 18.0866 8.01943 18.818 4.66167C16.8747 4.31841 14.4363 3.58995 10.5667 2.1276C10.396 2.06507 10.2718 2.18422 10.2364 2.28089L8.20771 7.81785C8.1616 7.94331 8.21568 8.08365 8.33249 8.14173C12.9379 9.76974 15.1692 10.9804 16.3702 11.6409ZM23.025 5.12574C21.8083 5.09773 20.6032 4.97943 19.3567 4.76483C18.7563 7.79014 17.9288 9.98115 16.8454 11.9128C17.8795 12.5289 18.8503 13.193 19.7996 13.9343C21.7706 11.4894 22.9089 8.38146 23.025 5.12574Z" fill="#3182CE"/>
                    <path d="M45.1531 23.144C43.8891 23.144 42.7211 22.936 41.6491 22.52C40.5771 22.088 39.6491 21.488 38.8651 20.72C38.0811 19.952 37.4651 19.048 37.0171 18.008C36.5851 16.968 36.3691 15.832 36.3691 14.6C36.3691 13.368 36.5851 12.232 37.0171 11.192C37.4651 10.152 38.0811 9.248 38.8651 8.48C39.6651 7.712 40.6011 7.12 41.6731 6.704C42.7451 6.272 43.9131 6.056 45.1771 6.056C46.3931 6.056 47.5371 6.264 48.6091 6.68C49.6811 7.08 50.5851 7.688 51.3211 8.504L50.1931 9.632C49.5051 8.928 48.7451 8.424 47.9131 8.12C47.0811 7.8 46.1851 7.64 45.2251 7.64C44.2171 7.64 43.2811 7.816 42.4171 8.168C41.5531 8.504 40.8011 8.992 40.1611 9.632C39.5211 10.256 39.0171 10.992 38.6491 11.84C38.2971 12.672 38.1211 13.592 38.1211 14.6C38.1211 15.608 38.2971 16.536 38.6491 17.384C39.0171 18.216 39.5211 18.952 40.1611 19.592C40.8011 20.216 41.5531 20.704 42.4171 21.056C43.2811 21.392 44.2171 21.56 45.2251 21.56C46.1851 21.56 47.0811 21.4 47.9131 21.08C48.7451 20.76 49.5051 20.248 50.1931 19.544L51.3211 20.672C50.5851 21.488 49.6811 22.104 48.6091 22.52C47.5371 22.936 46.3851 23.144 45.1531 23.144ZM61.1791 10.28C62.2031 10.28 63.0991 10.48 63.8671 10.88C64.6511 11.264 65.2591 11.856 65.6911 12.656C66.1391 13.456 66.3631 14.464 66.3631 15.68V23H64.6591V15.848C64.6591 14.52 64.3231 13.52 63.6511 12.848C62.9951 12.16 62.0671 11.816 60.8671 11.816C59.9711 11.816 59.1871 12 58.5151 12.368C57.8591 12.72 57.3471 13.24 56.9791 13.928C56.6271 14.6 56.4511 15.416 56.4511 16.376V23H54.7471V5.192H56.4511V13.856L56.1151 13.208C56.5151 12.296 57.1551 11.584 58.0351 11.072C58.9151 10.544 59.9631 10.28 61.1791 10.28ZM76.1738 23.12C75.1018 23.12 74.1658 22.92 73.3658 22.52C72.5658 22.12 71.9418 21.52 71.4938 20.72C71.0618 19.92 70.8458 18.92 70.8458 17.72V10.4H72.5498V17.528C72.5498 18.872 72.8778 19.888 73.5338 20.576C74.2058 21.248 75.1418 21.584 76.3418 21.584C77.2218 21.584 77.9818 21.408 78.6218 21.056C79.2778 20.688 79.7738 20.16 80.1098 19.472C80.4618 18.784 80.6378 17.96 80.6378 17V10.4H82.3418V23H80.7098V19.544L80.9738 20.168C80.5738 21.096 79.9498 21.824 79.1018 22.352C78.2698 22.864 77.2938 23.12 76.1738 23.12ZM87.0908 23V10.4H88.7228V13.832L88.5548 13.232C88.9068 12.272 89.4988 11.544 90.3308 11.048C91.1628 10.536 92.1948 10.28 93.4268 10.28V11.936C93.3628 11.936 93.2988 11.936 93.2348 11.936C93.1708 11.92 93.1068 11.912 93.0428 11.912C91.7148 11.912 90.6748 12.32 89.9228 13.136C89.1708 13.936 88.7948 15.08 88.7948 16.568V23H87.0908ZM102.968 10.28C103.992 10.28 104.888 10.48 105.656 10.88C106.44 11.264 107.048 11.856 107.48 12.656C107.928 13.456 108.152 14.464 108.152 15.68V23H106.448V15.848C106.448 14.52 106.112 13.52 105.44 12.848C104.784 12.16 103.856 11.816 102.656 11.816C101.76 11.816 100.976 12 100.304 12.368C99.6482 12.72 99.1362 13.24 98.7682 13.928C98.4162 14.6 98.2402 15.416 98.2402 16.376V23H96.5362V10.4H98.1682V13.856L97.9042 13.208C98.3042 12.296 98.9442 11.584 99.8242 11.072C100.704 10.544 101.752 10.28 102.968 10.28ZM110.163 23L117.651 6.2H121.491L129.003 23H124.923L118.779 8.168H120.315L114.147 23H110.163ZM113.907 19.4L114.939 16.448H123.579L124.635 19.4H113.907ZM127.959 23L133.743 15.416L133.671 17.48L128.127 10.088H132.327L135.831 14.912L134.247 14.96L137.871 10.088H141.855L136.287 17.408V15.392L142.047 23H137.799L134.127 17.864L135.687 18.08L132.039 23H127.959ZM149.874 23.192C148.402 23.192 147.106 22.904 145.986 22.328C144.882 21.752 144.026 20.968 143.418 19.976C142.81 18.968 142.506 17.824 142.506 16.544C142.506 15.248 142.802 14.104 143.394 13.112C144.002 12.104 144.826 11.32 145.866 10.76C146.906 10.184 148.082 9.896 149.394 9.896C150.658 9.896 151.794 10.168 152.802 10.712C153.826 11.24 154.634 12.008 155.226 13.016C155.818 14.008 156.114 15.2 156.114 16.592C156.114 16.736 156.106 16.904 156.09 17.096C156.074 17.272 156.058 17.44 156.042 17.6H145.554V15.416H154.074L152.634 16.064C152.634 15.392 152.498 14.808 152.226 14.312C151.954 13.816 151.578 13.432 151.098 13.16C150.618 12.872 150.058 12.728 149.418 12.728C148.778 12.728 148.21 12.872 147.714 13.16C147.234 13.432 146.858 13.824 146.586 14.336C146.314 14.832 146.178 15.424 146.178 16.112V16.688C146.178 17.392 146.33 18.016 146.634 18.56C146.954 19.088 147.394 19.496 147.954 19.784C148.53 20.056 149.202 20.192 149.97 20.192C150.658 20.192 151.258 20.088 151.77 19.88C152.298 19.672 152.778 19.36 153.21 18.944L155.202 21.104C154.61 21.776 153.866 22.296 152.97 22.664C152.074 23.016 151.042 23.192 149.874 23.192Z" fill="#4A5568"/>
                  </svg>
                </HStack>
              </Link>
            </Flex>
            <Flex
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              color={"gray.600"}
              icon={
                isOpen ? <IoMdClose w={12} h={12} /> : <RiMenuLine w={12} h={12} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
            <Flex justify="flex-end" align="center" color="gray.400">
            {userType === "subscribed" ? <Menu placement="bottom-end"><MenuButton as={IconButton}
                size="md"
                fontSize="lg"
                justifyContent={'center'}
                display={{ base:"none", md:'flex' }}
                variant="ghost"
                className="noFocus"
                color={"current"}><FaRegQuestionCircle style={{ margin:"0 auto" }} /></MenuButton>
                <MenuList color={'#4A5568'} backgroundColor={"#FFFFFF"} zIndex={151} position="relative">
                  <MenuItem color={'#4A5568'} backgroundColor={"#FFFFFF"} _focus={{ background:"inherit" }} _hover={{ background:"inherit" }}><Button variant="ghost" color={cols} w="full" _hover={{opacity:0.8}} onClick={() => router.push("/contact")}>Support</Button></MenuItem>
                  <MenuItem color={'#4A5568'} backgroundColor={"#FFFFFF"} _focus={{ background:"inherit" }} _hover={{ background:"inherit" }}><Button variant="ghost" color={cols} w="full" _hover={{opacity:0.8}} onClick={() => router.push("/tutorials/")}>Tutorials</Button></MenuItem>
                  </MenuList>
              </Menu> : <form target="_blank" action="https://churnaxe.com/checkout" method="POST">
                <input type="hidden" name="userEmail" value={user ? user.email : null} />
                <input type="hidden" name="userId" value={user ? user.id : null} />
                <Tooltip backgroundColor={"gray.700"} color={"white"} textAlign={"center"} p={2} borderRadius={"md"} label='Subscribe to ChurnAxe to get started.'><Button
                rounded={'md'}
                size={'md'}
                display={{base:"none",md:"flex"}}
                fontWeight={'normal'}
                variant={"outline"}
                type="submit"
                fontFamily={"'Montserrat', sans-serif!important"}
                colorScheme='blue'
                rightIcon={<MdShoppingCartCheckout size={20} />}>
                Join Now
                </Button></Tooltip>
              </form>}
              <Menu placement="bottom-end">
                <MenuButton as={IconButton}
                  size="md"
                  fontSize="lg"
                  justifyContent={'center'}
                  display={{ base:"none", md:'flex' }}
                  variant="ghost"
                  color="current"
                  mx={{ base: "2", md: "3" }}
                  className="noFocus"
                ><FaUserCircle style={{ margin:"0 auto" }} /></MenuButton>
                <MenuList color={'#4A5568'} backgroundColor={"#FFFFFF"} zIndex={151} position="relative">
                  {userType === "subscribed" ? <Text fontSize={"medium"} fontWeight={500} color={cols} p={4}>{user ? user.email : null} <Badge ml='3' colorScheme='green'>Subscribed</Badge></Text> : <Text fontSize={"medium"} fontWeight={500} color={cols} p={4}>{user ? user.email : null} <Badge ml='3' colorScheme='blue'>Inactive</Badge></Text>}
                  <MenuDivider borderColor={"#4A5568"} opacity={0.3} />
                  <form target="_blank" action="https://churnaxe.com/billing" method="POST">
                    <MenuItem color={'#4A5568'} backgroundColor={"#FFFFFF"} _focus={{ background:"inherit" }} _hover={{ background:"inherit" }}>
                      <input type="hidden" name="userId" value={user ? user.id : null} />
                      <Button _hover={{opacity:0.8}} variant="ghost" isDisabled={userType === "subscribed" ? false : true} color={cols} w="full" type="submit">Billing</Button>
                    </MenuItem>            
                  </form>
                  <MenuItem color={'#4A5568'} backgroundColor={"#FFFFFF"} _focus={{ background:"inherit" }} _hover={{ background:"inherit" }}><Button _hover={{opacity:0.8}} variant="ghost" color={cols} w="full" onClick={() => router.push("/account")}>Account</Button></MenuItem>
                  <MenuItem color={'#4A5568'} backgroundColor={"#FFFFFF"} _focus={{ background:"inherit" }} _hover={{ background:"inherit" }}><Button _hover={{opacity:0.8}} rightIcon={<MdOutlineExitToApp />} onClick={logOutSB} color={cols} variant="ghost" w="full">Sign Out</Button></MenuItem>
                  </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Box>
        <Collapse in={isOpen} animateOpacity>
          <MobileNav userType={userType} userBusinesses={userBusinesses} user={user} />
        </Collapse>
      </Box>
      <Box><Flex p={5} justifyContent="center" display={{ base: 'none', md: 'flex' }}>
        <DesktopNav userType={userType} userBusinesses={userBusinesses} />
      </Flex></Box>
    </Flex>
    </>
  );
}

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
      <Link
        href={href}
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ textDecoration:"none" }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'blue.300' }}
              fontSize="0.95rem"
              fontWeight={600}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={'blue.300'} w={5} h={5} as={FaChevronRight} />
          </Flex>
        </Stack>
      </Link>
    );
  };

const MobileNav = ({ user, userType, userBusinesses }) => {
    const logOutSB = async () => {
      let { error } = await supabase.auth.signOut()
      if (error) {
        toast({
          title: "Whoops!",
          description: "An unknown error has occurred. Please try again in a few minutes.",
          status: "error",
          position: "top-end",
          duration: 7500,
          isClosable: true,
        })
      } else {
        toast({
          title: "Signed Out!",
          description: "You have successfully signed out from your account.",
          status: "success",
          position: "top-end",
          duration: 7500,
          isClosable: true,
        })
        router.reload()
      }
    }
    const toast = useToast()
    const router = useRouter()
    let coll = 'gray.600'
    const cols = "gray.700"
    const [arrowDir, setArrowDir] = useState(true)
    return (
      <Stack
        bg={'#fafafa'}
        p={4}
        display={{ md: 'none' }}>
        <>{NAV_ITEMS.map((navItem) => (
          <MobileNavItem userType={userType} userBusinesses={userBusinesses} key={navItem.label} {...navItem} />
        ))}</>
        <Menu onClose={() => setArrowDir(false)} onOpen={() => setArrowDir(true)}>
          <MenuButton as={Text}
            justifyContent={'center'}
            className="noFocus"
            fontWeight={600}
            my={2}
            pt={2}
            color={coll}
            pointerEvents="all"
          ><Flex alignItems={"center"} w="100%"> <Text mr={3}>Account</Text> {arrowDir ? <FaChevronDown /> : <FaChevronUp />} </Flex></MenuButton>
          <MenuList color={'#4A5568'} backgroundColor={"#FFFFFF"}>
            {userType === "subscribed" ? <Text fontSize={"medium"} fontWeight={500} color={cols} p={4}>{user ? user.email : null} <Badge ml='3' colorScheme='green'>Subscribed</Badge></Text> : <Text fontSize={"medium"} fontWeight={500}  color={cols} p={4}>{user ? user.email : null} <Badge ml='3' colorScheme='blue'>Inactive</Badge></Text>}
            <MenuDivider />
            <form target="_blank" action="https://churnaxe.com/billing" method="POST">
            <MenuItem color={'#4A5568'} backgroundColor={"#FFFFFF"} _focus={{ background:"inherit" }} _hover={{ background:"inherit" }}>
              <input type="hidden" name="userId" value={user ? user.id : null} />
              <Button _hover={{opacity:0.8}} variant="ghost" isDisabled={userType === "subscribed" ? false : true} color={cols} w="full" type="submit">Billing</Button>
            </MenuItem>            
            </form>
            <MenuItem color={'#4A5568'} backgroundColor={"#FFFFFF"} _focus={{ background:"inherit" }} _hover={{ background:"inherit" }}><Button _hover={{opacity:0.8}} variant="ghost" color={cols} w="full" onClick={() => router.push("/account")}>Account</Button></MenuItem>
            <MenuItem color={'#4A5568'} backgroundColor={"#FFFFFF"} _focus={{ background:"inherit" }} _hover={{ background:"inherit" }}><Button _hover={{opacity:0.8}} rightIcon={<MdOutlineExitToApp />} onClick={logOutSB} color={cols} variant="ghost" w="full">Sign Out</Button></MenuItem>
            </MenuList>
        </Menu>
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href, userType, userBusinesses }) => {
    const { isOpen, onToggle } = useDisclosure();
    let coll = 'gray.600'
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          pointerEvents={userType === "subscribed" && userBusinesses ? "all":"none"}
          opacity={userType === "subscribed" && userBusinesses ? "1":"0.6"}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={coll}>
            {label}
          </Text>
          {children && (
            <Icon
              as={FaChevronDown}
              color={coll}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={3}
              h={3}
            />
          )}
        </Flex>
  
        <Collapse in={userType === "subscribed" && userBusinesses ? isOpen : false} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mb={3}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={'gray.200'}
            align={'start'}>
            {children &&
              children.map((child) => (
                <Link _hover={{ color:"blue.300" }} key={child.label} py={2} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };

  const DesktopNav = ({ userType, userBusinesses })  => {
    const linkColor = 'gray.600'
    const linkHoverColor = 'rgb(37, 37, 37)'
    const popBack = "#fafafa"

    const borderBottomColor = "gray.200"
  
    return (
      <Stack zIndex={150} position="relative" direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem, i) => (
          <Box key={i}>
            <Popover trigger={'hover'} placement={'bottom'}>
              <PopoverTrigger>
                <Link
                  p={2}
                  href={navItem.href ?? '#'}
                  fontWeight={500}
                  fontSize="0.95rem"
                  color={linkColor}
                  pointerEvents={userType === "subscribed" && userBusinesses ? "all":"none"}
                  opacity={userType === "subscribed" && userBusinesses ? "1":"0.6"}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Link>
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  boxShadow={'xl'}
                  bg={popBack}
                  border={"1px solid"}
                  borderColor={borderBottomColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };

const NAV_ITEMS = [,
    {
      label: 'Email Settings',
      href: '/settings',
    },
    {
      label: 'Churn',
      href: '/churn',
    },
    {
      label: `All Statistics`,
      href: '/dashboard',
    }
];