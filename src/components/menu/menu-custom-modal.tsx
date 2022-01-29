/* eslint-disable react/no-array-index-key */
import React from 'react';
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
  width: 100px;
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

const Row = styled.div``;

const Label = styled.label``;

const Input = styled.input``;

const Button = styled.button``;

const MenuCustomModal: React.FC<IProps> = ({
  customVisible,
  onSubmitCustomDifficultyHandler,
  onCancelCustomDifficultyHandler,
  gameInitOption,
}) => {
  const [{ row, column, mine }, onChange] = useInputs({ ...gameInitOption });
  return (
    <Wrapper customVisible={customVisible} onSubmit={(e) => onSubmitCustomDifficultyHandler(e, { row, column, mine })}>
      <Row>
        <Label>행</Label>
        <Input type="text" value={row} onChange={onChange} name="row" />
      </Row>
      <Row>
        <Label>열</Label>
        <Input type="text" value={column} onChange={onChange} name="column" />
      </Row>
      <Row>
        <Label>지뢰 숫자</Label>
        <Input type="text" value={mine} onChange={onChange} name="mine" />
      </Row>
      <Row>
        <Button type="submit">확인</Button>
        <Button type="button" onClick={onCancelCustomDifficultyHandler}>
          취소
        </Button>
      </Row>
    </Wrapper>
  );
};

export default MenuCustomModal;
