import React from 'react'

const TimelineStep = ({step, order, isCompleted, isCurrent, isLastStep, icon, description}) => {
    const iconBgColor = isCompleted || isCurrent ? `bg-${icon.bgColor}` : 'bg-gray-100';
    const iconTextColor = isCompleted || isCurrent ? 'text-white' : `text-${icon.textColor}`;
    const connectorColor = isCompleted ? 'bg-blue-500' : 'bg-gray-200';
    const labelTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';
    const descriptionTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';
  return (
    <li className='timeline-step'>
        <div className='flex items-center'>
            <div className={`step-icon ${step?.status === 'completed' ?
                 'bg-green-900 text-green-100' : step?.status === 'pending' ?
                  'bg-red-700 text-red-100' : step?.status === 'processing' ?
                   'bg-blue-600 text-blue-100' : 'bg-indigo-900 text-indigo-100'}`}>
                <i className={`ri-${icon.iconName} text-xl`}></i>
            </div>
            {!isLastStep && (<div className={`step-connector ${connectorColor}`}>
                                        
            </div>)}
        </div>
        <div className='step-content'>
                <h3 className= {`step-label  ${labelTextColor}`}>{step.label}</h3>
                <time className='step-time'>{order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'Time'}</time>
                <p className={`step-description ${descriptionTextColor}`}>{description}</p>
        </div>
    </li>
  )
}

export default TimelineStep