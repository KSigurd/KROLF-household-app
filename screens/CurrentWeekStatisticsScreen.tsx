import React, { useEffect } from "react";
import { Text } from "react-native-svg";
import { PieChart } from "react-native-svg-charts";
import { CompletedChore } from "../interfaces/completedChore";
import { avatars } from "../data/avatarData";
import { string } from "yup/lib/locale";
import { Avatar } from "react-native-paper";
import { useAppSelector, useAppDispatch } from "../store/store";
import { convertFromDTOToTotalChartData } from "../interfaces/statisticsDTO";
import { getStatisticsAction } from "../store/completedChore/completedChoreSlice";

interface UserStatisticsDTO {
  choreId: string;
  points: number;
  completedChores: ChoreStatisticsDTO[];
}

interface ChoreStatisticsDTO {
  completedChore: CompletedChore[];
  householdUserId: string;
  avatarId: string;
}

// TEST OBJECT
const testUser: UserStatisticsDTO = {
  choreId: "0",
  points: 90,
  completedChores: [
    {
      completedChore: [
        {
          choreId: "4",
          householdUserId: "1",
          date: new Date(),
        },
      ],
      householdUserId: "6",
      avatarId: "4",
    },
  ],
};
const testUserTwo: UserStatisticsDTO = {
  choreId: "5",
  points: 40,
  completedChores: [
    {
      completedChore: [
        {
          choreId: "0",
          householdUserId: "1",
          date: new Date(),
        },
      ],
      householdUserId: "5",
      avatarId: "5",
    },
  ],
};

const WeekNumber = (currentDate : Date) => {
    // const currentDate = new Date();
    var oneJan = new Date(currentDate.getFullYear(), 0, 1);
    var currentdateToNumber = (currentDate.getTime() - oneJan.getTime())
    var numberOfDays = Math.floor(currentdateToNumber / (24 * 60 * 60 * 1000));
    var result = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7 - 1);
    return result
}


const PieChartTest = () => {
  const dispatch = useAppDispatch();
  const activeHouseholdId = useAppSelector(
    (state) => state.household.activeHouseholdId
  );
  const statistics = useAppSelector(state => state.completedChore.statistics);
  const chartData = convertFromDTOToTotalChartData(statistics);

  useEffect(() => {
    dispatch(getStatisticsAction(activeHouseholdId));
  }, [activeHouseholdId]);
  
  let users: UserStatisticsDTO[] = [testUser, testUserTwo];
  const todayDate = new Date()

//   let filteredByWeek : UserStatisticsDTO[] = users.filter(d => WeekNumber(d.completedChores[].completedChore[].date) == WeekNumber(todayDate))

    // console.log(filteredByWeek)

  let data = [
    // {
    //   key: 1,
    //   value: 60,
    //   avatar: "🐸",
    //   svg: { fill: "#600080" },
    //   // arc: { outerRadius: "130%", cornerRadius: 10 },
    // },
    // {
    //   key: 2,
    //   value: 60,
    //   avatar: "👻",
    //   svg: { fill: "#9900cc" },
    // },
    // {
    //   key: 3,
    //   value: 60,
    //   avatar: "🤪",
    //   svg: { fill: "#c61aff" },
    // },
  ];

  for (let i = 0; i < users.length; i++) {
    const avatarId = users[i].completedChores[0].avatarId;

    data.push({
      key: parseInt(users[i].choreId),
      value: users[i].points,
      svg: { fill: avatars[i].color },
      // avatar: "🦋",
      avatar: avatars.find(a => a.id === avatarId)?.avatar,
      // något i stil med svg:
      // { fill: avatars[users[i].completedChores[nånting?].avatarId].color },
    });
  }

  // console.log(data[3])
//   console.log(data[4]);

  const Labels = ({ slices, height, width }: any) => {
    console.log('\n\n--------------------------')
    return slices.map((slice: any, index: number) => {
      console.log(slice);
      const { labelCentroid, pieCentroid, data } = slice;
      // {console.log(slice)}
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={24}
        >
          {data.avatar}
        </Text>
      );
    });
  };

  return (
    <PieChart
      style={{ height: 200 }}
      innerRadius={0}
      padAngle={0}
      data={chartData}
      valueAccessor={({ item }) => item.value}
      //spacing={0}
      outerRadius={"95%"}
    >
      <Labels slices={undefined} height={undefined} width={undefined} />
    </PieChart>
  );
};

export default PieChartTest;



















// import React from "react";
// import { PieChart } from "react-native-svg-charts";
// import { Circle, G, Image } from "react-native-svg";
// import Images from "../../../assets/images";

// class PieChartWithCenteredLabels extends React.PureComponent {
//   render() {
//     const data = [
//       {
//         key: 1,
//         amount: 50,
//         svg: { fill: "#600080" },
//       },
//       {
//         key: 2,
//         amount: 50,
//         svg: { fill: "#9900cc" },
//       },
//       {
//         key: 3,
//         amount: 40,
//         svg: { fill: "#c61aff" },
//       },
//       {
//         key: 4,
//         amount: 95,
//         svg: { fill: "#d966ff" },
//       },
//       {
//         key: 5,
//         amount: 35,
//         svg: { fill: "#ecb3ff" },
//       },
//     ];

//     const Labels = ({ slices, height, width }) => {
//       return slices.map((slice, index) => {
//         const { labelCentroid, pieCentroid, data } = slice;
//         return (
//           <G key={index} x={labelCentroid[0]} y={labelCentroid[1]}>
//             <Circle r={18} fill={"white"} />
//             <Image
//               x={-10}
//               y={10}
//               width={20}
//               height={20}
//               preserveAspectRatio="xMidYMid slice"
//               // opacity="1"
//               // href={Images.memes[index + 1]}
//             />
//           </G>
//         );
//       });
//     };

//     return (
//       <PieChart
//         style={{ height: 200 }}
//         valueAccessor={({ item }) => item.amount}
//         data={data}
//         spacing={0}
//         outerRadius={"95%"}
//         innerRadius={"0%"}
//         padAngle={0}
//       >
//         <Labels />
//       </PieChart>
//     );
//   }
// }

// export default PieChartWithCenteredLabels;

// import React from "react";
// import { PieChart } from "react-native-svg-charts";

// class PieChartExample extends React.PureComponent {
//   render() {
//     const data = [
//       85, 91, 35, 53, -53, 24, 50, -20, -80,
//     ];

//     const randomColor = () =>
//       ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
//         0,
//         7
//       );

//     const pieData = data
//       .filter((value) => value > 0)
//       .map((value, index) => ({
//         value,
//         svg: {
//           fill: randomColor(),
//           onPress: () => console.log("press", index),
//         },
//         key: `pie-${index}`,
//       }));

//     return <PieChart style={{ height: 200 }} data={pieData} />;
//   }
// }

// export default PieChartExample
