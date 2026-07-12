import { useState, useEffect, useMemo, type ReactNode } from 'react';
import {
  VertMConfigProvider,
  Typography,
  VertMText,
  VertMTextField,
  VertMTextFieldBare,
  VertMList,
  VertMButton,
  VertMInput,
  VertMSearch,
  VertMSpace,
  VertMDivider,
  VertMTag,
  VertMCheckbox,
  VertMRadio,
  VertMSwitch,
  VertMSelect,
  VertMForm,
  useForm,
  VertMAlert,
  VertMSpin,
  VertMProgress,
  VertMSkeleton,
  VertMResult,
  VertMEmpty,
  Tooltip,
  VertMPopover,
  VertMPopconfirm,
  VertMModal,
  VertMDrawer,
  message,
  notification,
  MessageHolder,
} from '@vertm/react';
import { createTheme, FONT_PRESETS, type FontPresetId } from '@vertm/tokens';
import {
  ChevronRight,
  Loading,
  Search,
  VertMIcon,
} from '@vertm/icons';
import {
  detectVerticalSupport,
  detectMongolFonts,
  normalizeForSearch,
  genderOfString,
  MONGOLIAN_WORD_BANK,
} from '@vertm/core';

const SAMPLE_TEXT = 'ᠪᠣᠰᠣᠭ᠎ᠠ ᠮᠣᠩᠭᠣᠯ UI';
const LONG_TEXT = 'ᠦᠭᠡ ᠬᠡᠯᠡ ᠦᠰᠦᠭ ᠪᠢᠴᠢᠭ᠌';

const GENDER_LABEL: Record<string, string> = {
  masculine: 'Masculine',
  feminine: 'Feminine',
  neuter: 'Neuter',
};

const SELECT_OPTIONS = MONGOLIAN_WORD_BANK.slice(0, 8).map((w) => ({
  label: w,
  value: w,
}));

function Section({
  title,
  children,
  wide,
  gallery,
}: {
  title: string;
  children: ReactNode;
  wide?: boolean;
  gallery?: boolean;
}) {
  return (
    <section
      className={[
        'demo-section',
        wide && 'demo-section--wide',
        gallery && 'demo-section--gallery',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <h2 className="demo-section__title">{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [inputVal, setInputVal] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [selectVal, setSelectVal] = useState('');
  const [selectMultiVal, setSelectMultiVal] = useState<string[]>([]);
  const [radioVal, setRadioVal] = useState('a');
  const [checkboxVals, setCheckboxVals] = useState<string[]>(['c']);
  const [switched, setSwitched] = useState(false);
  const [tagChecked, setTagChecked] = useState(false);
  const [dividerText, setDividerText] = useState('ᠳᠤᠮᠳᠠᠭᠤᠷ');
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [support, setSupport] = useState('');
  const [fonts, setFonts] = useState('');
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(false);
  const [fontId, setFontId] = useState<FontPresetId>('notoSansMongolian');
  const [form] = useForm();

  const theme = useMemo(
    () =>
      dark
        ? createTheme({
            colorPrimary: '#2d77db',
            colorLink: '#2d77db',
            colorLinkHover: '#4d94eb',
            caretColor: '#2d77db',
            colorBgContainer: '#1c1917',
            colorBgLayout: '#0c0a09',
            colorText: '#fafaf9',
            colorTextSecondary: '#a8a29e',
            colorBorder: '#44403c',
          })
        : createTheme(),
    [dark]
  );

  useEffect(() => {
    const s = detectVerticalSupport();
    setSupport(JSON.stringify(s, null, 2));
    detectMongolFonts().then((f) => setFonts(JSON.stringify(f, null, 2)));
  }, []);

  const filteredWords = useMemo(() => {
    if (!query.trim()) return MONGOLIAN_WORD_BANK;
    const key = normalizeForSearch(query);
    return MONGOLIAN_WORD_BANK.filter((w) =>
      normalizeForSearch(w).includes(key)
    );
  }, [query]);

  const listItems = useMemo(
    () =>
      MONGOLIAN_WORD_BANK.slice(0, 6).map((w, i) => ({
        id: String(i),
        text: w,
      })),
    []
  );

  return (
    <VertMConfigProvider theme={theme} fontFamily={FONT_PRESETS[fontId].fontFamily}>
      <MessageHolder />
      <div
        className="demo-page"
        style={{
          fontFamily: 'system-ui, sans-serif',
          background: dark ? '#0c0a09' : '#faf9f7',
          color: dark ? '#fafaf9' : '#1c1917',
        }}
      >
        <aside className="demo-rail">
          <div className="demo-rail__title">
            <VertMIcon size={24} color={theme.colorPrimary} vertical />
            <h1 style={{ margin: 0, fontSize: '1.25rem' }}>VertM UI Demo</h1>
          </div>
          <p className="demo-rail__desc">
            Traditional Mongolian vertical UI · Component showcase · {MONGOLIAN_WORD_BANK.length} words
            <br />
            Browse sections left to right
          </p>

          <div className="demo-rail__controls">
            <VertMButton onClick={() => setDark((d) => !d)} block>
              Switch to {dark ? 'light' : 'dark'} theme
            </VertMButton>
            <label className="demo-rail__font">
              Font
              <select
                value={fontId}
                onChange={(e) => setFontId(e.target.value as FontPresetId)}
              >
                {Object.values(FONT_PRESETS).map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                    {f.bundled ? ' (bundled)' : ' (system)'}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="demo-rail__meta">
            <div>
              <h3>Browser capabilities</h3>
              <pre>{support}</pre>
            </div>
            <div>
              <h3>Font detection</h3>
              <pre>{fonts}</pre>
            </div>
          </div>
        </aside>

        <main className="demo-scroll">
          <div className="demo-columns">
        <Section title="VertMText /  VertMList">
        <VertMSpace direction="horizontal" size="middle" align="start" wrap>
            <VertMText text={SAMPLE_TEXT} fontSize={24} />
            <VertMText
              text={`${SAMPLE_TEXT}`}
              href="https://github.com/VertM/VertM-UI-React"
              target="_blank"
              fontSize={20}
            />
            <VertMList items={listItems} ordered fontSize={18} />
          </VertMSpace>
        </Section>

        <Section title="Button">
          <VertMSpace direction="horizontal" size="middle" align="start">
            <VertMSpace direction="vertical" size="middle" wrap align="start">
              <VertMButton type="primary" onClick={() => message.info('ᠴᠢᠬᠤᠯᠠ ᠳᠠᠷᠤᠭᠤᠯ ᠎ᠢ ᠲᠣᠪᠴᠢᠳᠠᠪᠠ ︕')}>
                ᠴᠢᠬᠤᠯᠠ
              </VertMButton>
              <VertMButton>ᠡᠩ  ᠤᠨ</VertMButton>
              <VertMButton icon={<Search vertical />}>ᠬᠠᠢᠬᠤ</VertMButton>
              <VertMButton type="dashed" columnDepth={4}>
                ᠬᠠᠭᠤᠷᠮᠠᠭ ᠱᠤᠭᠤᠮ
              </VertMButton>
              <VertMButton type="text">ᠦᠰᠦᠭ</VertMButton>
            </VertMSpace>
            <VertMSpace direction="vertical" size="middle" wrap align="start">
              <VertMButton danger>Danger</VertMButton>
              <VertMButton loading icon={<Loading spin vertical />}>
                Loading
              </VertMButton>
              <VertMButton type="link">Link</VertMButton>
            </VertMSpace>
          </VertMSpace>
        </Section>

        <Section title="Input">
          <VertMSpace direction="horizontal" size="middle" align="start">
            <VertMInput
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="ᠪᠢᠴᠢᠭᠯᠡᠬᠦ ᠁"
              allowClear
            />
            <VertMInput.Search
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="ᠬᠠᠢᠬᠤ ᠁"
              enterButton
              onSearch={(v) => message.success(`ᠬᠠᠢᠯ᠎ᠠ : ${v || 'empty'}`)}
            />
            <VertMInput.Password placeholder="ᠨᠢᠬᠣᠴᠠ  ᠨᠣᠮᠧᠷ " />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <VertMInput.TextArea
                rows={2}
                columnDepth={4}
                maxColumns={3}
                placeholder="ᠪᠢᠴᠢᠭᠯᠡᠬᠦ ᠁"
              />
            </div>
          </VertMSpace>
        </Section>

        <Section title="Font size / Scale">
          <VertMSpace direction="horizontal" size="large" align="start">
              <VertMButton size="small" type="primary">ᠪᠣᠰᠣᠭ᠎ᠠ</VertMButton>
              <VertMButton size="middle" type="primary">ᠪᠣᠰᠣᠭ᠎ᠠ</VertMButton>
              <VertMButton size="large" type="primary">ᠪᠣᠰᠣᠭ᠎ᠠ</VertMButton>
          </VertMSpace>
          <br />
          <VertMSpace direction="horizontal" size="large" align="start">
             <VertMInput fontSize={14} lineHeight={1.6} placeholder="ᠪᠢᠴᠢᠭᠯᠡᠬᠦ ᠁" />
             <VertMInput fontSize={20} lineHeight={1.6} placeholder="ᠪᠢᠴᠢᠭᠯᠡᠬᠦ ᠁" />
             <VertMInput fontSize={28} lineHeight={1.5} columnDepth={3} placeholder="ᠪᠢᠴᠢᠭᠯᠡᠬᠦ ᠁" />
          </VertMSpace>
        </Section>

        <Section title="Space / Tag">
          <VertMSpace split={<VertMDivider />} align="start">
            <VertMTag>  ᠡᠩ  ᠤᠨ  </VertMTag>
            <VertMTag color="primary"> ᠥᠩᠭᠡ ᠣᠷᠣᠭᠤᠯᠬᠤ </VertMTag>
            <VertMTag closable onClose={() => message.info('ᠬᠠᠭᠠᠴᠢᠬᠠᠯ᠎ᠠ ')}>
             ᠬᠠᠭᠠᠬᠤ 
            </VertMTag>
            <VertMTag checkable checked={tagChecked} onChange={setTagChecked}>
             ᠰᠣᠩᠭᠣᠬᠤ 
            </VertMTag>
          </VertMSpace>
        </Section>

        <Section title="Typography ᠎/ Divider" wide>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Typography.Title level={1} copyable>ᠲᠤᠤᠯᠠ ᠎ᠶᠢᠨ  ᠰᠢᠭᠤᠢ </Typography.Title>
            <Typography.Link href="https://doc.onon.cn/p-277176.html"> ᠪ ᠶᠠᠪᠣᠬᠣᠭᠣᠯᠠᠩ </Typography.Link>
            <Typography.Paragraph> ᠲᠠᠤᠯᠠᠢ  ᠶ᠋ᠢᠨ ᠭᠦᠶᠦᠳᠡᠯ ᠰᠢᠭ᠌ ᠰᠠᠯᠬᠢᠨ  ᠳ᠋ᠦ  ᠲᠤᠤᠯᠠ  ᠶ᠋ᠢᠨ ᠰᠢᠭᠤᠢ ᠨᠠᠢᠢᠭᠤᠨ᠎ᠠ   </Typography.Paragraph>
            <VertMDivider placement="top" style={{ minHeight: 500 }}> ᠳᠡᠭᠡᠭᠦᠷ  </VertMDivider>
            <Typography.Paragraph> ᠲᠠᠤᠯᠠᠢ  ᠶ᠋ᠢᠨ ᠭᠦᠶᠦᠳᠡᠯ ᠰᠢᠭ᠌ ᠰᠠᠯᠬᠢᠨ  ᠳ᠋ᠦ  ᠲᠤᠤᠯᠠ  ᠶ᠋ᠢᠨ ᠰᠢᠭᠤᠢ ᠨᠠᠢᠢᠭᠤᠨ᠎ᠠ   </Typography.Paragraph>
            <VertMDivider
              placement="center"
              editable
              onTextChange={setDividerText}
              style={{ minHeight: 500 }}
            >
              {dividerText}
            </VertMDivider>
            <Typography.Paragraph> ᠲᠠᠤᠯᠠᠢ  ᠶ᠋ᠢᠨ ᠭᠦᠶᠦᠳᠡᠯ ᠰᠢᠭ᠌ ᠰᠠᠯᠬᠢᠨ  ᠳ᠋ᠦ  ᠲᠤᠤᠯᠠ  ᠶ᠋ᠢᠨ ᠰᠢᠭᠤᠢ ᠨᠠᠢᠢᠭᠤᠨ᠎ᠠ   </Typography.Paragraph>
            <VertMDivider placement="bottom" style={{ minHeight: 500 }}> ᠳᠣᠣᠭᠤᠷ  </VertMDivider>
          </div>
        </Section>

        <Section title="Radio / Checkbox / Switch">
          <VertMSpace direction="horizontal" size="middle" align="start">
            <VertMText text="ᠨᠢᠭᠡ ᠎ᠶᠢ ᠰᠣᠩᠭᠣᠬᠤ [single]"/>
            <VertMRadio.Group
              value={radioVal}
              onChange={setRadioVal}
              options={[
                { label: 'ᠰᠣᠩᠭᠣᠯᠲᠠ  A', value: 'a' },
                { label: 'ᠰᠣᠩᠭᠣᠯᠲᠠ  B', value: 'b' },
              ]}
            />
            <VertMText text="ᠠᠷᠪᠢᠨ ᠰᠣᠩᠭᠣᠬᠤ [multiple]" />
            <VertMCheckbox.Group
              options={[
                { label: 'ᠰᠣᠩᠭᠣᠯᠲᠠ  C', value: 'c' },
                { label: 'ᠰᠣᠩᠭᠣᠯᠲᠠ  D', value: 'd' },
                { label: 'ᠰᠣᠩᠭᠣᠯᠲᠠ  E', value: 'e' },
              ]}
              value={checkboxVals}
              onChange={setCheckboxVals}
            />
          <VertMText text="ᠰᠣᠯᠢᠬᠤ [toggle]"/>
          <VertMSwitch
              checked={switched}
              onChange={setSwitched}
              checkedChildren="ᠬᠠᠭᠠᠬᠤ"
              unCheckedChildren="ᠨᠡᠭᠡᠭᠡᠬᠦ"
            />
            </VertMSpace>
        </Section>

        <Section title="Select">
          <VertMSpace direction="vertical" size="middle"  align="start">
            <VertMSpace direction="horizontal" size="large" align="start">
              <VertMText text="ᠨᠢᠭᠡ ᠎ᠶᠢ ᠰᠣᠩᠭᠣᠬᠤ [single]"/>
                <VertMSelect
                  options={SELECT_OPTIONS}
                  value={selectVal}
                  onChange={(v) => setSelectVal(v as string)}
                  showSearch
                  allowClear
                  placeholder=""
                />
            </VertMSpace>
            <VertMSpace direction="horizontal" size="large" align="start">
                <VertMText text="ᠠᠷᠪᠢᠨ ᠰᠣᠩᠭᠣᠬᠤ [multiple]" />
                <VertMSelect
                  options={SELECT_OPTIONS}
                  value={selectMultiVal}
                  onChange={(v) => setSelectMultiVal(v as string[])}
                  multiple
                  showSearch
                  allowClear
                  height={300}
                  listWidth={300}
                  listHeight={300}
                  placeholder=""
                />
            </VertMSpace>
         </VertMSpace>
        </Section>

        <Section title="Form">
          <VertMForm
            form={form}
            onFinish={(vals) => message.success(`ᠲᠤᠰᠢᠶᠠᠴᠢᠬᠠᠯ᠎ᠠ : ${JSON.stringify(vals)}`)}
            onFinishFailed={() => message.error('Error')}
          >
            <VertMForm.Item
              name="word"
              label="ᠨᠡᠷ᠎ᠡ "
              rules={[{ required: true, message: 'ᠡᠷᠬᠡᠪᠰᠢ ᠲᠠᠭᠯᠠᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ ' }]}
            >
              <VertMInput placeholder="ᠲᠠᠭᠯᠠᠬᠤ  ᠁ " />
            </VertMForm.Item>
            <VertMForm.Item name="note" label="ᠪᠤᠰᠤᠳ ">
              <VertMInput.TextArea rows={3} />
            </VertMForm.Item>
            <VertMButton htmlType="submit" type="primary">
              ᠲᠤᠰᠢᠶᠠᠬᠤ 
            </VertMButton>
          </VertMForm>
        </Section>

        <Section title="Feedback" wide>
          <VertMSpace direction="vertical" size="middle" align="start">
            <VertMSpace direction="horizontal" size="large" align='start' wrap>
              <VertMAlert type="success" message="ᠵᠥᠪ !" showIcon closable />
              <VertMAlert type="warning" message="ᠠᠩᠬᠠᠷ !" description="ᠪᠤᠷᠤᠭᠤ ᠭᠠᠷᠪᠠ " showIcon />
              <VertMSpin spinning={spinning} tip="ᠡᠷᠢᠵᠦ  ᠪᠠᠢᠨ᠎ᠠ ᠁">
                <div
                  style={{
                    padding: '1rem',
                    background: 'var(--vertm-color-bg-container)',
                    border: '1px solid var(--vertm-color-border)',
                    borderRadius: 8,
                    minHeight: 80,
                  }}
                >
                  <VertMButton onClick={() => setSpinning((s) => !s)}>
                    {spinning ? '' : 'ᠡᠬᠢᠯᠡᠬᠦ '} 
                  </VertMButton>
                </div>
              </VertMSpin>
              <VertMProgress percent={65} />
              <VertMProgress type="circle" percent={75} />
              <VertMSkeleton active paragraph={{ rows: 3 }} />
            </VertMSpace>
            <VertMSpace direction="horizontal" size="middle" align="start">
              <VertMResult
                status="success"
                title="ᠳᠠᠭᠤᠰᠪᠠ "
                subTitle="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁"
                extra={<VertMButton type="primary">ᠪᠤᠴᠠᠬᠤ </VertMButton>}
              />
              <VertMEmpty description="ᠬᠣᠭᠣᠰᠤᠨ  ᠪᠠᠢᠨ᠎ᠠ ᠁ " />
            </VertMSpace>
          </VertMSpace>
        </Section>

        <Section title="Overlay / Modal">
          <VertMSpace direction="horizontal" size="middle" align="start">
            <VertMSpace direction="vertical" size="middle" align="start" wrap>
              <Tooltip title="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁">
                <VertMButton>Tooltip</VertMButton>
              </Tooltip>
              <VertMPopover title="ᠭᠠᠷᠴᠠᠭ " content="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁">
                <VertMButton>Popover</VertMButton>
              </VertMPopover>
              <VertMPopconfirm
                title="ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠬᠦ ᠦᠦ ?"
                onConfirm={() => message.success('ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠬᠦ ᠳᠠᠷᠤᠪᠴᠢ ᠎ᠶᠢ ᠲᠣᠪᠴᠢᠳᠠᠪᠠ ')}
              >
                <VertMButton danger>Popconfirm</VertMButton>
              </VertMPopconfirm>
            </VertMSpace>
            <VertMSpace direction="vertical" size="middle" align="start">
              <VertMButton onClick={() => setModalOpen(true)}> Modal</VertMButton>
              <VertMButton onClick={() => setDrawerOpen(true)}>Drawer</VertMButton>
              <VertMButton onClick={() => message.success('Global message')}>Message</VertMButton>
              <VertMButton
                onClick={() =>
                  notification.open({
                    message: 'ᠠᠩᠬᠠᠷ ！',
                    description: 'ᠠᠭᠤᠯᠭ᠎ᠠ ᠁ ',
                    placement: 'topRight',
                  })
                }
              >
                Notification
              </VertMButton>
            </VertMSpace>
            <VertMModal
              open={modalOpen}
              title="ᠭᠠᠷᠴᠠᠭ "
              onCancel={() => setModalOpen(false)}
              onOk={() => {
                message.success('');
                setModalOpen(false);
              }}
            >
              <VertMText text='ᠠᠭᠤᠯᠭ᠎ᠠ ᠁' />
            </VertMModal>
            <VertMDrawer
              open={drawerOpen}
              title="ᠰᠢᠷᠭᠤᠯ"
              placement="right"
              onClose={() => setDrawerOpen(false)}
            >
              <VertMText text='ᠠᠭᠤᠯᠭ᠎ᠠ ᠁' />
            </VertMDrawer>
          </VertMSpace>
        </Section>

        <Section title="Icons">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <ChevronRight vertical />
            <Search vertical />
            <Loading spin vertical />
            <ChevronRight vertical={false} />
          </div>
        </Section>

        <Section title="Word Bank Gallery" gallery>
          <div className="demo-gallery-layout">
            <div className="demo-gallery">
              {filteredWords.map((word, i) => (
                <div
                  key={i}
                  className="demo-gallery__item"
                  title={GENDER_LABEL[genderOfString(word)]}
                >
                  <VertMText text={word} fontSize={22} style={{ height: 100 }} />
                  <span className="demo-gallery__gender">
                    {GENDER_LABEL[genderOfString(word)]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Section>
          </div>
        </main>
      </div>
    </VertMConfigProvider>
  );
}
