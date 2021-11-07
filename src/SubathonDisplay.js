import styled from "styled-components";
import ProgressBar from "react-bootstrap/ProgressBar";
import MarqueeWhenOverflowText from "./MarqueeWhenOverflowText";
import Timer from "./Timer";

function SubathonDisplay({ config, subsThisStream, subathonEndDate, timeLastAdded }) {

  const achievedGoal = () => {
    const defaultReturnValue = [0, "No goal achieved"]
    const sortedGoals = Object.entries(config.goals).sort(x => x[0]).filter(x => x[0] <= subsThisStream);
    return sortedGoals.length > 0 ? sortedGoals[sortedGoals.length - 1] : defaultReturnValue;
  }

  const currentGoal = () => {
    const defaultReturnValue = [Infinity, "All goals achieved"]
    const sortedGoals = Object.entries(config.goals).sort(x => x[0]).filter(x => x[0] > subsThisStream);
    return sortedGoals.length > 0 ? sortedGoals[0] : defaultReturnValue;
  }

  // const currentGoalPercentage = () => {
  //   return Math.round(100 - (currentGoal()[0] - subsThisStream) / (currentGoal()[0] - achievedGoal()[0]) * 100);
  // }

  return (
    <div className="App">
      <SubathonContainer className="SubathonContainer">
        <SubathonTop>
          <SubathonText>
            <span>{currentGoal()[0] - subsThisStream} subs needed for:</span>
            <SubathonNextGoalText>
              <MarqueeWhenOverflowText>
                {currentGoal()[1]}
              </MarqueeWhenOverflowText>
            </SubathonNextGoalText>
          </SubathonText>
          <SubathonTimer>
            <Timer endDate={subathonEndDate} timeLastAdded={timeLastAdded} />
          </SubathonTimer>
        </SubathonTop>
        <SubathonProgress>
          {/* label={currentGoalPercentage() + "%"} */}
          <ProgressBar animated now={subsThisStream} min={achievedGoal()[0]} max={currentGoal()[0]} />
          <ProgressLabels>
            <span>{achievedGoal()[0]}</span>
            <span>{subsThisStream}</span>
            <span>{currentGoal()[0]}</span>
          </ProgressLabels>
        </SubathonProgress>
      </SubathonContainer>

    </div>
  );
}

const SubathonNextGoalText = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  width: 100%;
`;

const SubathonText = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  align-items: flex-start;
`;

const SubathonTimer = styled.div`
  font-size: 3rem;
  width: 35%;
`;

const SubathonTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SubathonProgress = styled.div`
  .progress-bar{
    background-color: var(--subathon-progressbarcolor);
  }
`;

const ProgressLabels = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SubathonContainer = styled.div`
  --subathon-criticaltime: #FF4136;
  --subathon-lowtime: #FF4136;
  --subathon-addedtime: #2ECC40;
  --subathon-textcolor: white;
  --subathon-progressbarcolor: #001f3f;
  --subathon-background: linear-gradient(77deg, rgb(28,33,43) 0%, rgb(28,44,52) 50%, rgb(28,36,52) 100%);
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  font-size: 1.5rem;
  color: var(--subathon-textcolor);
  background: var(--subathon-background);
  width: 600px;
  height: 150px;
`;

export default SubathonDisplay;
