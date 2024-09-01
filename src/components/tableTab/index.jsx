import { useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../../theme/colors";

const TableTab = ({
  tabs,
  onTabChange,
  onTabClick,
  backgroundColor = "#FFF3EBCC",
  activeColor = colors.primary300,
  hoverColor = colors.primary50,
  padding = "16px 24px", // Add padding as a prop with a default value
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTabFromHash = () => {
    const hash = location.hash.replace("#", "");
    const activeTab = tabs.find((tab) => tab.hash === hash);
    return activeTab ? activeTab.hash : tabs[0].hash;
  };

  const activeTab = getActiveTabFromHash();

  const handleTabClick = (hash) => {
    navigate(`#${hash}`);
    if (onTabChange) {
      onTabChange(hash);
    }
    if (onTabClick) {
      onTabClick(hash); // Trigger the onTabClick function to handle routing
    }
  };

  useEffect(() => {
    if (!location.hash) {
      navigate(`#${tabs[0].hash}`);
    }
  }, [tabs, location.hash, navigate]);

  return (
    <TabContainer backgroundColor={backgroundColor} padding={padding}>
      {tabs.map(({ label, hash }) => (
        <TabButton
          key={hash}
          active={activeTab === hash}
          activeColor={activeColor}
          hoverColor={hoverColor}
          onClick={() => handleTabClick(hash)}
        >
          {label}
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
  }
`;
