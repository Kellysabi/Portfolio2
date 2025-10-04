import React from 'react';

export const VerticalTimeline = ({ children, className = '' }) => {
    return (
        <div className={`relative w-full ${className}`}>
            {/* Center line for tablet and desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[3px] bg-slate-200" />
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { itemIndex: index });
                }
                return child;
            })}
        </div>
    );
};

export const VerticalTimelineElement = ({
                                            date,
                                            icon,
                                            iconStyle = {},
                                            contentStyle = {},
                                            contentArrowStyle = {},
                                            children,
                                            className = '',
                                            itemIndex = 0
                                        }) => {
    // Extract border properties from contentStyle
    const {
        borderBottom,
        borderStyle,
        borderBottomColor,
        boxShadow,
        ...restContentStyle
    } = contentStyle;

    // Determine if this element should be on the left or right (alternating)
    const isLeft = itemIndex % 2 === 0;

    return (
        <div className={`relative mb-10 md:mb-16 ${className}`}>
            {/* Mobile Layout - Only for phones */}
            <div className="flex items-start md:hidden">
                {/* Timeline line for mobile */}
                <div className="absolute left-[30px] top-[70px] bottom-[-20px] w-[3px] bg-slate-200" />

                {/* Icon */}
                <div
                    className="relative z-10 flex items-center justify-center w-[60px] h-[60px] rounded-full flex-shrink-0"
                    style={{
                        boxShadow: '0 0 0 4px #fff',
                        ...iconStyle
                    }}
                >
                    {icon}
                </div>

                {/* Content */}
                <div className="flex-1 ml-6">
                    <div className="text-sm font-medium text-slate-500 mb-3">{date}</div>
                    <div
                        className="relative bg-white rounded-lg p-5"
                        style={{
                            borderBottom: borderBottom || '8px',
                            borderStyle: borderStyle || 'solid',
                            borderBottomColor: borderBottomColor || '#e2e8f0',
                            boxShadow: boxShadow !== undefined ? boxShadow : '0 3px 10px rgba(0,0,0,0.1)',
                            ...restContentStyle
                        }}
                    >
                        <div
                            className="absolute left-0 top-6 w-0 h-0 -ml-2"
                            style={{
                                borderTop: '8px solid transparent',
                                borderBottom: '8px solid transparent',
                                borderRight: borderBottomColor ? `8px solid ${borderBottomColor}` : '8px solid #e2e8f0',
                                ...contentArrowStyle
                            }}
                        />
                        {children}
                    </div>
                </div>
            </div>

            {/* Tablet/Desktop Layout - Alternating left and right */}
            <div className="hidden md:block">
                <div className="flex items-start justify-between">
                    {/* Left side content (shows when isLeft is true) */}
                    <div className="w-[calc(50%-60px)] text-right pr-8">
                        {isLeft && (
                            <>
                                <div className="text-base font-medium text-slate-500 mb-3">{date}</div>
                                <div
                                    className="relative bg-white rounded-lg p-6 inline-block w-full"
                                    style={{
                                        borderBottom: borderBottom || '8px',
                                        borderStyle: borderStyle || 'solid',
                                        borderBottomColor: borderBottomColor || '#e2e8f0',
                                        boxShadow: boxShadow !== undefined ? boxShadow : '0 3px 10px rgba(0,0,0,0.1)',
                                        ...restContentStyle
                                    }}
                                >
                                    {/* Arrow pointing right to icon */}
                                    <div
                                        className="absolute right-0 top-10 w-0 h-0 -mr-2"
                                        style={{
                                            borderTop: '10px solid transparent',
                                            borderBottom: '10px solid transparent',
                                            borderLeft: borderBottomColor ? `10px solid ${borderBottomColor}` : '10px solid #e2e8f0',
                                            ...contentArrowStyle
                                        }}
                                    />
                                    <div className="text-left">
                                        {children}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Center Icon */}
                    <div
                        className="relative z-10 flex items-center justify-center w-[80px] h-[80px] rounded-full flex-shrink-0 mx-4"
                        style={{
                            boxShadow: '0 0 0 4px #fff',
                            ...iconStyle
                        }}
                    >
                        {icon}
                    </div>

                    {/* Right side content (shows when isLeft is false) */}
                    <div className="w-[calc(50%-60px)] text-left pl-8">
                        {!isLeft && (
                            <>
                                <div className="text-base font-medium text-slate-500 mb-3">{date}</div>
                                <div
                                    className="relative bg-white rounded-lg p-6"
                                    style={{
                                        borderBottom: borderBottom || '8px',
                                        borderStyle: borderStyle || 'solid',
                                        borderBottomColor: borderBottomColor || '#e2e8f0',
                                        boxShadow: boxShadow !== undefined ? boxShadow : '0 3px 10px rgba(0,0,0,0.1)',
                                        ...restContentStyle
                                    }}
                                >
                                    {/* Arrow pointing left to icon */}
                                    <div
                                        className="absolute left-0 top-10 w-0 h-0 -ml-2"
                                        style={{
                                            borderTop: '10px solid transparent',
                                            borderBottom: '10px solid transparent',
                                            borderRight: borderBottomColor ? `10px solid ${borderBottomColor}` : '10px solid #e2e8f0',
                                            ...contentArrowStyle
                                        }}
                                    />
                                    <div className="text-left">
                                        {children}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};