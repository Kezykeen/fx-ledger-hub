"use client";

import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { Button } from "../buttons";

const DrawerRoot = styled.div`
  .app-drawer-root {
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 10;
      background-color: #091e428a;
      transition: opacity 200ms;
    }

    .drawer {
      position: fixed;
      top: 0;
      height: 100%;
      width: 256px;
      display: flex;
      flex-direction: column;
      transition: transform 300ms;
      z-index: 50;
      background-color: white;
    }

    .header {
      padding: 16px;
    }

    .content {
      flex: 1;
      flex-grow: 1;
      overflow: auto;
      padding: 16px;
    }

    .footer {
      width: 100%;
      padding: 16px;

      .button-container {
        display: flex;
        justify-content: flex-end;
        gap: 16px;
      }
    }
  }
`;

const HideScrollBar = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Drawer = ({
  open,
  onClose,
  children,
  anchor = "right",
  isFooter,
  onAction,
  onSecondaryAction,
  actionText,
  secondaryActionText,
  loading,
  selector,
  header,
}) => {
  const portalRef = (useRef < Element) | (null > null);

  useEffect(() => {
    portalRef.current = document.getElementById(selector);
  }, [selector]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClose = () => {
    document.body.style.overflow = "";
    onClose();
  };

  return (
    <>
      {portalRef.current &&
        ReactDOM.createPortal(
          <DrawerRoot>
            <div className="app-drawer-root">
              <div
                onClick={handleClose}
                className={`overlay ${
                  open ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              />
              <div
                className={`drawer ${
                  anchor === "right" ? "right-0" : "left-0"
                } ${
                  open
                    ? "translate-x-0"
                    : anchor === "right"
                    ? "translate-x-full"
                    : "-translate-x-full"
                }`}
              >
                <div className="header">{header}</div>
                <HideScrollBar className="content">{children}</HideScrollBar>
                {isFooter && (
                  <div className="footer">
                    <div className="button-container">
                      {secondaryActionText && (
                        <Button
                          onClick={() => {
                            if (!loading && onSecondaryAction)
                              onSecondaryAction();
                          }}
                        >
                          {secondaryActionText}
                        </Button>
                      )}
                      {actionText && (
                        <Button
                          onClick={() => {
                            if (!loading && onAction) onAction();
                          }}
                        >
                          {actionText}
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DrawerRoot>,
          portalRef.current
        )}
    </>
  );
};
