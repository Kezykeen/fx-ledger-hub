import { useState } from "react";
import styled from "styled-components";
import { colors } from "../../theme/colors";

const TableTab = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  onTabClick,
  backgroundColor = "#FFF3EBCC",
  activeColor = colors.Primary300,
  hoverColor = colors.Primary50,
  padding = "16px 24px", // Add padding as a prop with a default value
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
    if (onTabClick) {
      onTabClick(tab); // Trigger the onTabClick function to handle routing
    }
  };

  return (
    <TabContainer backgroundColor={backgroundColor} padding={padding}>
      {tabs.map((tab) => (
        <TabButton
          key={tab}
          active={activeTab === tab}
          activeColor={activeColor}
          hoverColor={hoverColor}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </TabButton>
      ))}
    </TabContainer>
  );
};

export { TableTab };

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || "#FFF3EBCC"};
  border-radius: 8px;
  padding: ${(props) => props.padding};
  gap: 4px;
`;

const TabButton = styled.button`
  background-color: ${(props) =>
    props.active ? props.activeColor : "transparent"};
  color: ${(props) => (props.active ? "white" : props.theme.colors.gray500)};
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.active ? props.activeColor : props.hoverColor};
    color: ${({ theme }) => theme.colors.gray400};
  }
`;
