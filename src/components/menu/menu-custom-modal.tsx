/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import useInputs from '@/hooks/use-inputs';
import { IGameInitOption } from '@/types/game';

interface IProps {
  customVisible: boolean;
  onSubmitCustomDifficultyHandler: (e: React.FormEvent, gameInitOption: IGameInitOption) => void;
  onCancelCustomDifficultyHandler: () => void;
  gameInitOption: IGameInitOption;
}

const Wrapper = styled.form<{ customVisible: boolean }>`
  width: 130px;
  position: absolute;
  background-color: #c0c0c0;
  border: 1px solid black;
  font-size: 13px;
  top: 33px;
  ${(props) =>
    !props.customVisible &&
    css`
      opacity: 0;
      user-select: none;
      pointer-events: none;
    `};
`;

const BorderDiv = styled.div`
  border: 1px solid black;
  margin: 1px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 3px;
`;

const Label = styled.div`
  width: 70px;
`;

const Input = styled.input`
  width: 50px;
  background-color: lightgray;
  padding-left: 3px;
`;

const ButtonRow = styled(Row)`
  justify-content: space-around;
`;

const Button = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  width: 40px;
  font-weight: bold;
  background-color: darkgray;
`;

const MenuCustomModal: React.FC<IProps> = ({
  customVisible,
  onSubmitCustomDifficultyHandler,
  onCancelCustomDifficultyHandler,
  gameInitOption,
}) => {
  const [{ row, column, mine }, onChange] = useInputs({ ...gameInitOption });
  const rowRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (customVisible && rowRef.current) rowRef.current.focus();
  }, [customVisible]);
  return (
    <Wrapper
      customVisible={customVisible}
      onSubmit={(e) =>
        onSubmitCustomDifficultyHandler(e, { row: Number(row), column: Number(column), mine: Number(mine) })
      }
    >
      <BorderDiv>
        <Row>
          <Label>행</Label>
          <Input type="text" value={row} onChange={onChange} name="row" ref={rowRef} />
        </Row>
        <Row>
          <Label>열</Label>
          <Input type="text" value={column} onChange={onChange} name="column" />
        </Row>
        <Row>
          <Label>지뢰 숫자</Label>
          <Input type="text" value={mine} onChange={onChange} name="mine" />
        </Row>
        <ButtonRow>
          <Button type="submit">확인</Button>
          <Button type="button" onClick={onCancelCustomDifficultyHandler}>
            취소
          </Button>
        </ButtonRow>
      </BorderDiv>
    </Wrapper>
  );
};

export default MenuCustomModal;
