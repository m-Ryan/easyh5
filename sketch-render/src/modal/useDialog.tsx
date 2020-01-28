import React, { useState, useMemo, useCallback, useRef } from "react";
import { unlockContaier, lockContaier } from "@/util/utils";

type DialogChildren = JSX.Element | (React.FunctionComponentElement<any>);
export function useDialog() {

  const [component, setComponent] = useState<DialogChildren | null>(null);
  const lockScrollIdRef = useRef('');

  const showComponent = useCallback(
      (com: DialogChildren, lockId: string = '') => {
        const lockScrollId = lockScrollIdRef.current;
        if (lockScrollId) {
          unlockContaier(lockScrollId);
        }
        if (lockId) {
          lockContaier(lockId);
        }
        setComponent(com);
        lockScrollIdRef.current = lockId;
      }, []);

  const hideComponent = useCallback(
      () => {
        const lockScrollId = lockScrollIdRef.current;
        if (lockScrollId) {
          unlockContaier(lockScrollId);
          lockScrollIdRef.current = '';
        }
        setComponent(null);
      }, []);


  const dialogContainer = useMemo(
      (): null | JSX.Element => {
        if (component) {
          return (
            React.createElement(component.type, {
              ...component.props
            })
          )

        }
        return null;
      },
      [component]
  );
  return {
    dialogManger: {
      showComponent,
      hideComponent
    },
    dialogContainer
  }
}
