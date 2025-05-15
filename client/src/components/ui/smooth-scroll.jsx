import React, { useEffect } from 'react';
export var SmoothScroll = function (_a) {
    var children = _a.children, _b = _a.offset, offset = _b === void 0 ? 80 : _b;
    useEffect(function () {
        var handleClick = function (e) {
            var target = e.target;
            if (!target)
                return;
            var anchor = target.closest('a[href^="#"]');
            if (!anchor)
                return;
            e.preventDefault();
            var targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#')
                return;
            var targetElement = document.querySelector(targetId);
            if (!targetElement)
                return;
            var targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: targetPosition - offset,
                behavior: 'smooth'
            });
        };
        document.addEventListener('click', handleClick);
        return function () {
            document.removeEventListener('click', handleClick);
        };
    }, [offset]);
    return <>{children}</>;
};
export default SmoothScroll;
