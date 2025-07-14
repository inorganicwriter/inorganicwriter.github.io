// 现代化JavaScript - 使用ES6+语法和现代Web API

class ModernWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavbar();
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupMobileMenu();
    this.setupScrollProgress();
    this.setupLazyLoading();
  }

  // 导航栏效果
  setupNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav a');
    
    // 滚动时导航栏效果
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScrollY = currentScrollY;
    });

    // 活跃链接高亮
    this.updateActiveNavLink();
    window.addEventListener('scroll', () => this.updateActiveNavLink());
  }

  // 更新活跃导航链接
  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], .hero[id]');
    const navLinks = document.querySelectorAll('.navbar-nav a');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  }

  // 滚动效果
  setupScrollEffects() {
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // 动画效果
  setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // 观察需要动画的元素
    document.querySelectorAll('.card, .timeline-item, .contact-item').forEach(el => {
      observer.observe(el);
    });
  }

  // 移动端菜单
  setupMobileMenu() {
    const toggle = document.querySelector('.navbar-toggle');
    const nav = document.querySelector('.navbar-nav');
    
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        this.toggleMobileMenuIcon(toggle);
      });

      // 点击链接后关闭菜单
      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('active');
          this.toggleMobileMenuIcon(toggle, false);
        });
      });

      // 点击外部关闭菜单
      document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !nav.contains(e.target)) {
          nav.classList.remove('active');
          this.toggleMobileMenuIcon(toggle, false);
        }
      });
    }
  }

  // 切换移动端菜单图标
  toggleMobileMenuIcon(toggle, forceClose = null) {
    const spans = toggle.querySelectorAll('span');
    const isActive = forceClose !== null ? !forceClose : toggle.classList.contains('active');
    
    if (isActive) {
      toggle.classList.remove('active');
      spans[0].style.transform = 'rotate(0deg) translateY(0px)';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'rotate(0deg) translateY(0px)';
    } else {
      toggle.classList.add('active');
      spans[0].style.transform = 'rotate(45deg) translateY(8px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    }
  }

  // 滚动进度条
  setupScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    if (progressBar) {
      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = `${scrollPercent}%`;
      });
    }
  }

  // 懒加载图片
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // 工具方法：节流函数
  throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // 工具方法：防抖函数
  debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new ModernWebsite();
});

// 添加一些实用的全局函数
window.modernUtils = {
  // 复制文本到剪贴板
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showNotification('已复制到剪贴板', 'success');
    } catch (err) {
      console.error('复制失败:', err);
      this.showNotification('复制失败', 'error');
    }
  },

  // 显示通知
  showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加样式
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 24px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      backgroundColor: type === 'success' ? '#10b981' : 
                      type === 'error' ? '#ef4444' : '#3b82f6'
    });

    document.body.appendChild(notification);

    // 显示动画
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // 自动隐藏
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, duration);
  },

  // 格式化日期
  formatDate(date, options = {}) {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    return new Intl.DateTimeFormat('zh-CN', { ...defaultOptions, ...options })
      .format(new Date(date));
  },

  // 检测设备类型
  getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  },

  // 检测是否支持WebP
  supportsWebP() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }
};

// 性能监控
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('页面加载性能:', {
        DNS查询: perfData.domainLookupEnd - perfData.domainLookupStart,
        TCP连接: perfData.connectEnd - perfData.connectStart,
        请求响应: perfData.responseEnd - perfData.requestStart,
        DOM解析: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        总加载时间: perfData.loadEventEnd - perfData.navigationStart
      });
    }, 0);
  });
}

// 错误监控
window.addEventListener('error', (e) => {
  console.error('JavaScript错误:', {
    message: e.message,
    filename: e.filename,
    lineno: e.lineno,
    colno: e.colno,
    error: e.error
  });
});

// 未处理的Promise拒绝
window.addEventListener('unhandledrejection', (e) => {
  console.error('未处理的Promise拒绝:', e.reason);
});
