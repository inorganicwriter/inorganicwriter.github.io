// 页面加载动画 - 月亮和云朵主题
(function() {
    'use strict';
    
    // 创建加载动画HTML
    function createLoader() {
        // 如果已经存在，不重复创建
        if (document.getElementById('page-loader')) {
            return;
        }
        
        const loaderHTML = `
            <div id="page-loader" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #1a1d2e;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 99999;
                transition: opacity 0.6s ease;
            ">
                <div class="loader-content" style="
                    position: relative;
                    width: 200px;
                    height: 200px;
                ">
                    <!-- 月亮 -->
                    <div class="moon" style="
                        position: absolute;
                        width: 80px;
                        height: 80px;
                        background: #ffd587;
                        border-radius: 50%;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        box-shadow: 0 0 30px rgba(255, 213, 135, 0.6);
                        animation: moonGlow 2s ease-in-out infinite;
                    ">
                        <!-- 月亮上的阴影 -->
                        <div style="
                            position: absolute;
                            width: 20px;
                            height: 20px;
                            background: rgba(255, 179, 71, 0.3);
                            border-radius: 50%;
                            top: 15px;
                            left: 20px;
                        "></div>
                        <div style="
                            position: absolute;
                            width: 15px;
                            height: 15px;
                            background: rgba(255, 179, 71, 0.2);
                            border-radius: 50%;
                            bottom: 20px;
                            right: 15px;
                        "></div>
                    </div>
                    
                    <!-- 云朵1 -->
                    <div class="cloud cloud1" style="
                        position: absolute;
                        width: 60px;
                        height: 20px;
                        background: rgba(255, 255, 255, 0.8);
                        border-radius: 20px;
                        top: 30px;
                        left: 20px;
                        animation: cloudFloat1 3s ease-in-out infinite;
                    ">
                        <div style="
                            position: absolute;
                            width: 30px;
                            height: 30px;
                            background: rgba(255, 255, 255, 0.8);
                            border-radius: 50%;
                            top: -15px;
                            left: 10px;
                        "></div>
                        <div style="
                            position: absolute;
                            width: 25px;
                            height: 25px;
                            background: rgba(255, 255, 255, 0.8);
                            border-radius: 50%;
                            top: -12px;
                            right: 10px;
                        "></div>
                    </div>
                    
                    <!-- 云朵2 -->
                    <div class="cloud cloud2" style="
                        position: absolute;
                        width: 50px;
                        height: 18px;
                        background: rgba(255, 255, 255, 0.7);
                        border-radius: 18px;
                        bottom: 40px;
                        right: 30px;
                        animation: cloudFloat2 4s ease-in-out infinite;
                    ">
                        <div style="
                            position: absolute;
                            width: 25px;
                            height: 25px;
                            background: rgba(255, 255, 255, 0.7);
                            border-radius: 50%;
                            top: -12px;
                            left: 8px;
                        "></div>
                        <div style="
                            position: absolute;
                            width: 20px;
                            height: 20px;
                            background: rgba(255, 255, 255, 0.7);
                            border-radius: 50%;
                            top: -10px;
                            right: 8px;
                        "></div>
                    </div>
                    
                    <!-- 云朵3 -->
                    <div class="cloud cloud3" style="
                        position: absolute;
                        width: 45px;
                        height: 16px;
                        background: rgba(255, 255, 255, 0.6);
                        border-radius: 16px;
                        top: 120px;
                        left: 120px;
                        animation: cloudFloat3 3.5s ease-in-out infinite;
                    ">
                        <div style="
                            position: absolute;
                            width: 22px;
                            height: 22px;
                            background: rgba(255, 255, 255, 0.6);
                            border-radius: 50%;
                            top: -11px;
                            left: 7px;
                        "></div>
                        <div style="
                            position: absolute;
                            width: 18px;
                            height: 18px;
                            background: rgba(255, 255, 255, 0.6);
                            border-radius: 50%;
                            top: -9px;
                            right: 7px;
                        "></div>
                    </div>
                    
                    <!-- 加载文字 -->
                    <div style="
                        position: absolute;
                        bottom: -50px;
                        left: 50%;
                        transform: translateX(-50%);
                        color: #ffd587;
                        font-family: 'Times New Roman', Times, serif;
                        font-size: 18px;
                        white-space: nowrap;
                        animation: textFade 1.5s ease-in-out infinite;
                    ">Loading...</div>
                </div>
            </div>
            
            <style>
                @keyframes moonGlow {
                    0%, 100% {
                        box-shadow: 0 0 30px rgba(255, 213, 135, 0.6);
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% {
                        box-shadow: 0 0 50px rgba(255, 213, 135, 0.9);
                        transform: translate(-50%, -50%) scale(1.05);
                    }
                }
                
                @keyframes cloudFloat1 {
                    0%, 100% {
                        transform: translateX(0) translateY(0);
                        opacity: 0.8;
                    }
                    50% {
                        transform: translateX(10px) translateY(-5px);
                        opacity: 1;
                    }
                }
                
                @keyframes cloudFloat2 {
                    0%, 100% {
                        transform: translateX(0) translateY(0);
                        opacity: 0.7;
                    }
                    50% {
                        transform: translateX(-8px) translateY(5px);
                        opacity: 0.9;
                    }
                }
                
                @keyframes cloudFloat3 {
                    0%, 100% {
                        transform: translateX(0) translateY(0);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translateX(12px) translateY(-3px);
                        opacity: 0.8;
                    }
                }
                
                @keyframes textFade {
                    0%, 100% {
                        opacity: 0.5;
                    }
                    50% {
                        opacity: 1;
                    }
                }
            </style>
        `;
        
        // 确保body存在后再插入
        if (document.body) {
            document.body.insertAdjacentHTML('afterbegin', loaderHTML);
        } else {
            // 如果body还不存在，等待DOM加载
            document.addEventListener('DOMContentLoaded', function() {
                document.body.insertAdjacentHTML('afterbegin', loaderHTML);
            });
        }
    }
    
    // 隐藏加载动画
    function hideLoader() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    loader.remove();
                }, 600);
            }, 400);
        }
    }
    
    // 修复页面滚动位置
    function fixScrollPosition() {
        window.scrollTo(0, 0);
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    }
    
    // 初始化
    function init() {
        // 立即尝试创建加载动画
        createLoader();
        
        // 确保DOM加载后也创建（以防万一）
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createLoader);
        }
        
        // 页面完全加载后隐藏动画
        window.addEventListener('load', function() {
            fixScrollPosition();
            hideLoader();
        });
    }
    
    // 立即执行初始化
    init();
})();
