const autoScrollTable = {
  mounted(el, binding) {
    let animationId;
    let isPaused = false;

    let lastTimestamp = 0;
    const animationSpeed = 60; // 调整此值来控制动画速度

    const { speed, pauseOnHover, resetOnEnd } = binding.value;

    function scroll(timestamp) {
      if (timestamp - lastTimestamp >= animationSpeed) {
        if (!isPaused) {
          el.scrollTop += speed; // 调整滚动速度，可以根据需求修改

          if (resetOnEnd && el.scrollTop >= el.scrollHeight - el.clientHeight) {
            el.scrollTop = 0; // 滚动到底部时回到最顶部
          }
        }
        lastTimestamp = timestamp;
      }

      animationId = requestAnimationFrame(scroll);
    }

    function handleMouseEnter() {
      isPaused = true;
    }

    function handleMouseLeave() {
      isPaused = false;
    }
    if (pauseOnHover) {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    }

    scroll(); // 开始滚动

    el._animationId = animationId;
  },
  beforeUnmount(el) {
    cancelAnimationFrame(el._animationId);

    el.removeEventListener("mouseenter", el._handleMouseEnter);
    el.removeEventListener("mouseleave", el._handleMouseLeave);
  },
};

export function setupAutoScrollTableDirective(app) {
  app.directive("autoScrollTable", autoScrollTable);
}

// 用于实现一个自动滚动的表格。这个指令在指定的 HTML 元素上实现自动滚动效果，并且可以根据传入的参数控制滚动速度、悬停时暂停滚动以及滚动到底部时是否重置回顶部
export default autoScrollTable;
