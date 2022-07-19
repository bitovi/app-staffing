import { Center, Flex, Td, Text } from "@chakra-ui/react";
import { isBefore } from "date-fns";

const DataGanttLine = (props: any) => {
  const items = [0, 1, 2, 3, 4, 5, 6];


  const generateGantt = () => {
    return props.timeline.map((timeframe)=>{
      // if start date of role is after the end date of timeframe, empty cell
      if (isBefore(timeframe.endDate, props.role.startDate)){
        return (
          <Flex flex={1} backgroundColor="#ffffff">
            <Center height = {5} flex={1}>
              <div> empty! </div>
            </Center>
          </Flex>
        )
      }
    }
  }


  return (
    <>
      <Flex flex="1" flexDirection="row">
        {items.map(() => {
          return (
          
              <Flex flex={1} backgroundColor="#440022">
                <Center  borderRadius="8px" height={5} flex={1}>
                  <div>x</div>
                </Center>
              </Flex>
          );
        })}
      </Flex>
    </>
  );
};

export default DataGanttLine;
