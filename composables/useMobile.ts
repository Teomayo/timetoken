import { ref, onMounted, onUnmounted } from "vue";

export const useMobile = () => {
  const isMobile = ref(false);

  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768;
    console.log("Mobile check:", isMobile.value, "Width:", window.innerWidth);
  };

  onMounted(() => {
    // Initial check
    checkMobile();
    // Add event listener
    window.addEventListener("resize", checkMobile);
    console.log("Mobile detection mounted");
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkMobile);
    console.log("Mobile detection unmounted");
  });

  return {
    isMobile,
  };
};
