import React from 'react';

export default function Button({buttonStyle, testId, buttonType, contentStyle, buttonContent, onClickFunction}){
    return <>
        {renderButton(buttonStyle, testId, buttonType, contentStyle, buttonContent, onClickFunction)}
    </>
}

function renderButton(buttonStyle,testId, buttonType, contentStyle, buttonContent, onClickFunction){
    return <>
        <button data-testid={testId} className={buttonStyle} type = {buttonType} onClick={onClickFunction}>{renderContent(contentStyle, buttonContent)}</button>
    </>
}

function renderContent(contentStyle, buttonContent){
    return <>
        <div className={contentStyle}> {buttonContent}</div>
    </>
}