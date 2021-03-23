
import { Button, Layout, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
import { ConfigurationPanel } from '@/components/ConfigurationPanel';
import { Editor, VisualEditorProvider } from '@/index';
import { IPage } from '@/components/core/blocks/basic/Page';
import { VisualEditorProps } from '@/components/VisualEditorProvider';
import services from '@example/services';
import { Stack } from '@example/components/Stack';
import { ToolPanel } from '../ToolPanel';
import { Header } from '@example/components/Header';
import { useOnBoarding } from '../useOnBoarding';

export const ExamplePage = (props: {
  initialValues: {
    title: string;
    picture: string;
    content: IPage[];
  },
  onSave: (data: VisualEditorProps) => void;
  isSubmitting: boolean;
}) => {

  const [val, setVal] = useState<number>(document.body.clientWidth - 350);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const { nextStep, content } = useOnBoarding();

  useEffect(() => {
    if (ref) {
      nextStep();
    }
  }, [nextStep, ref]);

  return (

    <div>
      <VisualEditorProvider
        data={props.initialValues}
        onSubmit={props.onSave}
        uploadHandler={services.common.uploadByQiniu}
      >
        {
          ({ handleSubmit }) => {
            return (

              <Layout style={{
                height: '100vh',
                overflow: 'hidden',
              }}
              >
                <Header
                  style={{ backgroundColor: '#fff' }}
                  backUrl="/" title={'编辑'}
                  extra={(
                    <Stack>
                      <Button loading={props.isSubmitting} type="primary" onClick={() => handleSubmit()}>保存</Button>
                    </Stack>
                  )}
                />
                <Layout>
                  <div style={{ display: 'flex', width: '100vw' }}>
                    <Layout.Sider theme="light" width={302}>
                      <div
                        ref={setRef}
                        id="leftSide"
                        style={{
                          height: '100%',
                          overflow: 'overlay',
                        }}
                      >
                        <ToolPanel />
                      </div>
                    </Layout.Sider>

                    <Layout>
                      <div id="centerEditor">
                        <Editor />

                      </div>

                    </Layout>

                    <Layout.Sider theme="light" width={document.body.clientWidth - val}>
                      <div
                        id="rightSide"
                        style={{
                          height: '100%',
                          overflowY: 'scroll',
                        }}
                      >
                        <ConfigurationPanel />
                      </div>
                    </Layout.Sider>
                  </div>
                </Layout>
                <div style={{ backgroundColor: '#fff' }}>
                  <Slider
                    tooltipVisible={false}
                    value={val} marks={{ [document.body.clientWidth - 350]: document.body.clientWidth - 350 }}
                    min={0} max={document.body.clientWidth}
                    onChange={setVal} style={{ zIndex: 999 }}
                  />
                </div>
              </Layout>

            );
          }
        }
      </VisualEditorProvider>
      {content}
    </div>
  );
};
