import { useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../../theme/colors";

const TableTab = ({
  tabs,
  onTabChange,
  backgroundColor = "#FFF3EBCC",
  activeColor = colors.primary300,
  hoverColor = colors.primary50,
  padding = "16px 24px",
  handleStateTab,
  activeStateTab,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTabFromHash = () => {
    const hash = location.hash.replace("#", "");
    const activeTab = tabs.find((tab) => tab.hash === hash);
    return activeTab ? activeTab.hash : tabs[0].hash;
  };

  const activeTab = activeStateTab ?? getActiveTabFromHash();

  const handleTabClick = (hash) => {
    navigate(`#${hash}`);
    if (onTabChange) {
      onTabChange(hash);
    }
  };

  useEffect(() => {
    if (!location.hash && !activeStateTab) {
      navigate(`#${tabs[0].hash}`);
    }
  }, [tabs, location.hash, navigate, activeStateTab]);

  return (
    <TabContainer $backgroundColor={backgroundColor} $padding={padding}>
      {tabs.map(({ label, hash }) => (
        <TabButton
          key={hash}
          $active={activeTab === hash}
          $activeColor={activeColor}
          $hoverColor={hoverColor}
          onClick={() =>
            activeStateTab ? handleStateTab(hash) : handleTabClick(hash)
          }
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
  background-color: ${(props) => props.$backgroundColor || "#FFF3EBCC"};
  border-radius: 8px;
  padding: ${(props) => props.$padding};
  gap: 4px;
`;

const TabButton = styled.button`
  background-color: ${(props) =>
    props.$active ? props.$activeColor : "transparent"};
  color: ${(props) => (props.$active ? "white" : props.theme.colors.gray500)};
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.$active ? props.$activeColor : props.$hoverColor};
  }
`;
