import { Flex, Image, Text } from "@chakra-ui/react";

export default function NoResults() {
  return (
    <Flex
      width="100%"
      flexDirection="column"
      minHeight="30px"
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
      backgroundColor="white"
      padding="82px 30px 153px"
      border="1px solid #eee"
      borderRadius="4px"
      alignItems="center"
    >
      <Image
        height="100px"
        width="100px"
        src="assets/images/folderWithFile.png"
        alt="Folder With File"
      />
      <Text fontWeight="bold" fontSize="16px" lineHeight="24px">
        There are currently no team members.
      </Text>
    </Flex>
  );
}
