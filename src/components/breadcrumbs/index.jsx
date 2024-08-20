import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Breadcrumbs = ({ crumbs }) => {
  return (
    <BreadcrumbsContainer>
      <BreadcrumbsList>
        {crumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbsItem>
              {crumb.path ? (
                <Link href={crumb.path} passHref>
                  <BreadcrumbsLink>{crumb.name}</BreadcrumbsLink>
                </Link>
              ) : (
                <BreadcrumbsLast>{crumb.name}</BreadcrumbsLast>
              )}
            </BreadcrumbsItem>
            {index < crumbs.length - 1 && (
              <Separator>
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9L5 5L1 1"
                    stroke="#D0D5DD"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Separator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbsList>
    </BreadcrumbsContainer>
  );
};

const BreadcrumbsContainer = styled.nav`
  margin: 0.5rem 0;
  width: 100%;
`;

const BreadcrumbsList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const BreadcrumbsItem = styled.li`
  display: flex;
  align-items: center;
  & > a {
    display: flex;
    align-items: center;
    text-transform: capitalize;
  }
`;

const BreadcrumbsLink = styled.p`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.Primary300};
  transition: color 0.3s;
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const BreadcrumbsLast = styled.p`
  color: ${({ theme }) => theme.colors.gray500};
  transition: color 0.3s;
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const Separator = styled.span`
  margin: auto 0.5rem;
`;
