/* 
  ========================================================================
  JAVASCRIPT CONTROLLER FOR "THE INCLEMENT WRAGGE" ARCHIVE
  ========================================================================
  Author: Curtis Cox - s4022757
  Context: Interactive biographical archive of Clement Lindley Wragge (1852-1922)
  Action: Scroll-driven interface
  
  SCROLL MECHANICS & EVENT LOOP OPTIMIZATION:
  In modern web development, listening directly to 'scroll' events and executing 
  DOM manipulations can lead to "Layout Thrashing" and severe stuttering, 
  especially on screens with high refresh rates (90Hz - 120Hz+). This happens 
  when the browser attempts to paint a frame before Javascript calculations 
  for the new positions are completed.
  
  To solve this, I've implement a decoupled scrolling loop:
  1. The window 'scroll' event listener is passive and does not perform 
     any layout writes. It simply caches the scroll position and sets a 
      flag ('ticking').
  2. If the flag is set, requestAnimationFrame (rAF) is called to trigger 
     the layout update. This aligns our DOM writes precisely with the 
     browser's next paint pass.
  3. All translation calculations are relative to scroll container bounds, 
     meaning the interaction remains responsive to window resizing and scaling.
     
  USABILITY & MECHANICAL CORRESPONDENCE:
  - Scroll Depth as a Timeline: By mapping vertical scroll to horizontal 
    translation ('transform: translateX()'),the user has tactile, 
    fine-grained speed control over the projection strip. They can reverse 
    scroll to review a slide, or speed through transitions, replicating the 
    physical cranking of a vintage film strip or slide carousel.
  - Active State Mapping: I've used bounding box coordinates to detect which 
    element is closest to the screen center, rather than hardcoding arbitrary 
    scroll depths. This ensures the correct slide info updates dynamically, 
    even if fonts or layout containers resize.
  ========================================================================
*/

// Reference:
// - MDN DOMContentLoaded: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
// - W3Schools JS HTML DOM: https://www.w3schools.com/js/js_htmldom.asp
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements cache
  const heroText = document.getElementById("hero-text");
  const heroLantern = document.getElementById("hero-lantern-container");
  const heroLightCone = document.getElementById("hero-light-cone");
  const scrollIndicator = document.getElementById("hero-scroll-indicator");
  const projectorBeam = document.getElementById("projector-beam");

  // Persistent Widget Elements
  const scrollProgressLens = document.getElementById("scroll-progress-lens");
  const progressRingFill = document.getElementById("progress-ring-fill");

  // Narrative Acts & Visual Elements (Act III Split Scroll)
  const acts = document.querySelectorAll(".narrative-act");
  const act2 = document.getElementById("act2");
  const floatingCyclone = document.getElementById("floating-cyclone");

  // Gallery & Split-Scroll Elements (Act III)
  const galleryTrigger = document.getElementById("act3"); // Trigger scroll track is now Act III!
  const slideTrack = document.getElementById("slide-track");
  const slideCards = document.querySelectorAll(".lantern-slide-card");
  const captionTitle = document.getElementById("caption-title");
  const captionMeta = document.getElementById("caption-meta");
  const currentSlideNum = document.getElementById("current-slide-num");

  const lecturesTextScrollable = document.getElementById(
    "lectures-text-scrollable",
  );
  const lecturesTextContainer = document.getElementById(
    "lectures-text-container",
  );

  // Lightbox Modal Elements
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const lightboxClose = document.getElementById("lightbox-close");

  // Scroll to Top click interaction on Magic Lantern lens widget
  if (scrollProgressLens) {
    scrollProgressLens.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Scroll loop tracking variables
  let lastScrollY = window.scrollY;
  let ticking = false;

  // Active slide details cache
  let currentActiveSlideIndex = -1;

  // Passive scroll listener (prevents blocking touch/wheel scrolls)
  // References:
  // - MDN EventTarget.addEventListener() (passive parameter): https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
  // - W3Schools onscroll Event: https://www.w3schools.com/jsref/event_onscroll.asp
  window.addEventListener(
    "scroll",
    () => {
      lastScrollY = window.scrollY;
      requestTick();
    },
    { passive: true },
  );

  // Update layout when resizing to ensure coordinate calculations stay accurate
  window.addEventListener(
    "resize",
    () => {
      requestTick();
    },
    { passive: true },
  );

  // Trigger immediate tick on load to set correct initial states
  requestTick();

  /*
   * Request tick helper to prevent multiple frames from queuing up
   * References:
   * - MDN Window.requestAnimationFrame(): https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
   * - W3Schools Window requestAnimationFrame(): https://www.w3schools.com/jsref/met_win_requestanimationframe.asp
   */
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateLayout);
      ticking = true;
    }
  }

  /**
   * Master render loop executing all scroll-linked changes
   */
  function updateLayout() {
    // ----------------------------------------------------
    // Section 1: Hero Scroll-Driven Projection Wipe-In & Pinning
    // ----------------------------------------------------
    const heroHeight = window.innerHeight;

    if (lastScrollY <= heroHeight) {
      // Phase 1: Wiping in the projection while keeping the elements static
      const p = lastScrollY / heroHeight; // 0 to 1

      // Keep title and lantern fully visible and static
      if (heroText) {
        heroText.style.opacity = "1";
        heroText.style.transform = "scale(1) translateY(0px)";
      }
      if (heroLantern) {
        heroLantern.style.opacity = "1";
        heroLantern.style.transform = "scale(1)";
      }

      // Control light cone projection wipe-in (scaleX from 0 to 1)
      if (heroLightCone) {
        if (lastScrollY > 10) {
          // As scaleX goes from 0 to 1, we also fade it in quickly
          const lightOpacity = Math.min(1.0, p * 4.0);
          heroLightCone.classList.add("flickering");
          heroLightCone.style.opacity = lightOpacity.toFixed(3);
          heroLightCone.style.transform = `translateY(-50%) scaleX(${p.toFixed(3)})`;
        } else {
          heroLightCone.classList.remove("flickering");
          heroLightCone.style.opacity = "0";
          heroLightCone.style.transform = "translateY(-50%) scaleX(0)";
        }
      }

      // Fade scroll indicator quickly
      if (scrollIndicator) {
        const indOpacity = Math.max(0, 1 - p * 3.0);
        scrollIndicator.style.opacity = indOpacity.toFixed(3);
      }
    } else if (lastScrollY <= 2 * heroHeight) {
      // Phase 2: Projection is fully wiped in, scrolling out of view
      const p2 = (lastScrollY - heroHeight) / heroHeight; // 0 to 1
      const fadeOpacity = Math.max(0, 1 - p2 * 2.0); // fade out over first half of scroll past
      const translateY = -(p2 * 100);

      if (heroText) {
        heroText.style.opacity = fadeOpacity.toFixed(3);
        heroText.style.transform = `translateY(${translateY.toFixed(1)}px)`;
      }
      if (heroLantern) {
        heroLantern.style.opacity = fadeOpacity.toFixed(3);
        heroLantern.style.transform = `translateY(${translateY.toFixed(1)}px)`;
      }
      if (heroLightCone) {
        heroLightCone.classList.remove("flickering");
        heroLightCone.style.opacity = fadeOpacity.toFixed(3);
        heroLightCone.style.transform = `translateY(-50%) translateY(${translateY.toFixed(1)}px) scaleX(1)`;
      }
      if (scrollIndicator) {
        scrollIndicator.style.opacity = "0";
      }
    } else {
      // Completely hidden when scrolled way past
      if (heroText) heroText.style.opacity = "0";
      if (heroLantern) heroLantern.style.opacity = "0";
      if (heroLightCone) {
        heroLightCone.classList.remove("flickering");
        heroLightCone.style.opacity = "0";
      }
      if (scrollIndicator) scrollIndicator.style.opacity = "0";
    }

    // ----------------------------------------------------
    // Section 2: Unified Act Transitions, Cyclone Parallax, & Scroll Ring
    // ----------------------------------------------------

    // 2.1 Update Persistent Magic Lantern Progress Ring
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const overallProgress = docHeight > 0 ? lastScrollY / docHeight : 0;
    if (progressRingFill) {
      const circumference = 238.76; // 2 * Math.PI * 38
      const offset = circumference - overallProgress * circumference;
      progressRingFill.style.strokeDashoffset = offset.toFixed(2);
    }

    // 2.2 Toggle Active State on Acts in Viewport
    acts.forEach((act) => {
      const rect = act.getBoundingClientRect();
      // Act is considered active if it takes up a significant portion of the viewport
      if (
        rect.top < window.innerHeight * 0.75 &&
        rect.bottom > window.innerHeight * 0.25
      ) {
        act.classList.add("active-act");
      } else {
        act.classList.remove("active-act");
      }
    });

    // 2.3 Act II: Cyclone Floating Parallax and Spin
    if (act2 && floatingCyclone) {
      const rect2 = act2.getBoundingClientRect();
      if (rect2.top < window.innerHeight && rect2.bottom > 0) {
        const act2Height = rect2.height;
        const progressAct2 =
          (window.innerHeight - rect2.top) / (act2Height + window.innerHeight);

        // Translate and spin the vector cyclone
        const rotation = progressAct2 * 600; // 600 degrees of spin
        const translateX = progressAct2 * 200 - 80; // horizontal float translate
        const translateY = progressAct2 * 120 - 60; // vertical float translate

        floatingCyclone.style.transform = `translate(${translateX.toFixed(1)}px, ${translateY.toFixed(1)}px) rotate(${rotation.toFixed(1)}deg)`;
      }
    }

    // ----------------------------------------------------
    // Section 3: Act III Parallel Vertical Text & Horizontal Slide Scroll
    // ----------------------------------------------------
    const galleryRect = galleryTrigger.getBoundingClientRect();
    const galleryTop = galleryRect.top;
    const galleryHeight = galleryRect.height;
    const totalScrollableGallery = galleryHeight - window.innerHeight;

    if (galleryTop <= 0 && galleryTop > -totalScrollableGallery) {
      // User is scrolling inside the sticky container
      const relativeScroll = -galleryTop;
      const progress = relativeScroll / totalScrollableGallery; // 0 to 1

      // 3.1 Scroll Left Column Narrative Text Vertically
      if (lecturesTextScrollable && lecturesTextContainer) {
        const maxTextTranslate = Math.max(
          0,
          lecturesTextScrollable.scrollHeight -
            lecturesTextContainer.clientHeight +
            40,
        ); // 40px padding buffer
        const translateY = progress * maxTextTranslate;
        lecturesTextScrollable.style.transform = `translateY(${-translateY.toFixed(1)}px)`;
      }

      // 3.2 Scroll Right Column Slide Carriage Horizontally
      const trackWidth = slideTrack.scrollWidth;
      const galleryViewport = document.querySelector(
        ".lectures-gallery-column",
      );
      const galleryViewportWidth = galleryViewport
        ? galleryViewport.clientWidth
        : window.innerWidth * 0.6;
      const maxTranslate = Math.max(0, trackWidth - galleryViewportWidth);

      // Translate the carriage horizontally
      const translateX = progress * maxTranslate;
      slideTrack.style.transform = `translateX(${-translateX.toFixed(1)}px)`;

      // 3.3 Identify which lantern slide is closest to the gallery column center (70vw of viewport)
      let closestSlideIndex = 0;
      let minSlideDist = Infinity;
      const galleryColumnCenter = window.innerWidth * 0.7; // Center of the 60vw right column

      slideCards.forEach((card, index) => {
        // References:
        // - MDN Element.getBoundingClientRect(): https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
        // - W3Schools Element getBoundingClientRect(): https://www.w3schools.com/jsref/met_element_getboundingclientrect.asp
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - galleryColumnCenter);

        if (dist < minSlideDist) {
          minSlideDist = dist;
          closestSlideIndex = index;
        }
      });

      // Update active slide card highlight and metadata description
      if (closestSlideIndex !== currentActiveSlideIndex) {
        currentActiveSlideIndex = closestSlideIndex;

        slideCards.forEach((card, index) => {
          if (index === closestSlideIndex) {
            card.classList.add("active-slide");
          } else {
            card.classList.remove("active-slide");
          }
        });

        // Pull dataset values from active slide card
        const activeCard = slideCards[closestSlideIndex];
        const title = activeCard.getAttribute("data-title");
        const meta = activeCard.getAttribute("data-meta");

        // Render caption updates
        captionTitle.textContent = title;
        captionMeta.textContent = meta;
        currentSlideNum.textContent = closestSlideIndex + 1;

        // Subtle camera flash flare animation on projector ambient beam to simulate slide shift
        projectorBeam.style.opacity = "1.0";
        setTimeout(() => {
          projectorBeam.style.opacity = "0.7";
        }, 150);
      }
    }

    ticking = false;
  }

  // ----------------------------------------------------
  // Interactive Outro & Lightbox System
  // ----------------------------------------------------

  /**
   * Opens lightbox and populates it with the target slide image and data
   */

  /**
   * Closes the lightbox mode
   */
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore page scrolling
    // Clear media source to stop browser background decodes
    setTimeout(() => {
      lightboxImg.src = "";
    }, 500);
  }

  // Attach close events
  lightboxClose.addEventListener("click", closeLightbox);

  // Close lightbox on clicking dark ambient backdrop
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // ========================================================================
  // DYNAMIC ARCHIVE CATALOG SYSTEM (300+ Magic Lantern Slides)
  // ========================================================================

  const magicLanternsImages = [
    "5-minute-interval-u46-1033303_54960616255_o.webp",
    "ad-je-domine-levavi-g7-1033246_54960610930_o.webp",
    "advertisement-for-the-endless-universe-1033400_54960497318_o.webp",
    "america-nebula-cygnus-1033195_54960552234_o.webp",
    "america-nebula-cygnus-g26-1033267_54960613000_o.webp",
    "america-nebula-cygnus-g56-1033220_54960554109_o.webp",
    "america-nebula-in-cygnus-1033201_54960479753_o.webp",
    "america-nebula-in-cygnus-wolf-u25-1033295_54960488373_o.webp",
    "anatomy-drawing-1033447_54960573819_o.webp",
    "anatomy-drawing-1033449_54960627975_o.webp",
    "archimedes-apennines-1033421_54959434557_o.webp",
    "astro-climatological-specimen-chart-u68-1033204_54960552859_o.webp",
    "astronomy-slide-1033211_54960307241_o.webp",
    "astronomy-slide-1033408_54959433882_o.webp",
    "astronomy-slide-1033425_54960499133_o.webp",
    "astronomy-slide-g143-1033369_54960321536_o.webp",
    "astronomy-slide-g22-1033254_54960484343_o.webp",
    "astronomy-slide-g25-1033255_54960484423_o.webp",
    "astronomy-slide-u11-1033276_54960486588_o.webp",
    "astronomy-slide-u12-1033275_54960486473_o.webp",
    "astronomy-slide-u15-1033274_54959422357_o.webp",
    "astronomy-slide-u16-1033312_54960316086_o.webp",
    "astronomy-slide-u20-1033297_54960488518_o.webp",
    "astronomy-slide-u22-1033300_54960561819_o.webp",
    "astronomy-slide-u26-1033293_54960615575_o.webp",
    "astronomy-slide-u27-1033292_54959424172_o.webp",
    "astronomy-slide-u4-1033279_54960486963_o.webp",
    "astronomy-slide-u40-1033309_54959425552_o.webp",
    "astronomy-slide-u43-1033307_54960562589_o.webp",
    "astronomy-slide-u71-1033187_54960605785_o.webp",
    "astronomyslide-paris-14th-march-1894-um25-1033294_54960314796_o.webp",
    "atlantic-ooze-2500-fathoms-g150-1033372_54960321756_o.webp",
    "back-to-the-depths-g140-1033368_54960568399_o.webp",
    "bay-1033415_54960625325_o.webp",
    "ben-nevis-observatory-o30-1033358_54960621390_o.webp",
    "betelgeuse-g146-1033370_54960622295_o.webp",
    "bush-and-waterfall-1033473_54960502908_o.webp",
    "capemba-feb-12th-1899-1033448_54960573919_o.webp",
    "cattle-1033467_54960629240_o.webp",
    "cattle-herding-waikato-1033453_54960501528_o.webp",
    "children-playing-on-seashore-1033475_54960629845_o.webp",
    "clement-l-wragge-at-waiata-tropical-gardens-1033446_54960627720_o.webp",
    "clement-wragges-house-waiata-tropical-gardens-birkenhead-1033445_54960573634_o.webp",
    "clouds-after-storm-o92-1033336_54959428277_o.webp",
    "cluster-in-toucan-ballarat-june-1910-g27-1033271_54960613445_o.webp",
    "cluster-m13-herculis-1033523_54960580209_o.webp",
    "colombo-by-moonlight-019-1033353_54960319961_o.webp",
    "colombo-sw-monsoon-o21-1033352_54959429612_o.webp",
    "comet-1882-e-h-143-1033322_54959426817_o.webp",
    "comparative-size-of-the-earth-u68-1033191_54959415212_o.webp",
    "copernicus-1033394_54960323066_o.webp",
    "cygnus-g156-1033375_54960568784_o.webp",
    "cygnus-u56-1033174_54960477523_o.webp",
    "cygnus-wolf-the-america-nebula-cygnus-wolf-1033524_54960507368_o.webp",
    "dimensions-of-moon-1033522_54960633805_o.webp",
    "drawing-of-house-of-a-merchant-in-canton-1033483_54960329611_o.webp",
    "drawing-of-moon-surface-with-earth-in-distance-1033519_54960579884_o.webp",
    "drawing-of-surgical-procedure-1033450_54960628095_o.webp",
    "drawing-of-surgical-procedure-1033451_54960327366_o.webp",
    "drought-on-warrego-queensland-o85-1033339_54960492563_o.webp",
    "dust-shoals-from-the-sun-bombarding-the-earth-u68a-1033190_54960606035_o.webp",
    "earth-and-moon-1033284_54960560454_o.webp",
    "earth-and-moon-1033378_54960322121_o.webp",
    "earth-and-moon-comparative-dimensions-of-the-earth-and-moon-1033526_54960580444_o.webp",
    "earth-and-sun-v71c-1033186_54960478658_o.webp",
    "eclipse-of-moon-march-22-1033377_54960322046_o.webp",
    "eclipse-u75-1033183_54960478443_o.webp",
    "eclipse-u78-1033182_54960478353_o.webp",
    "eclipses-of-the-sun-g83-1033233_54960482268_o.webp",
    "eruption-g75-1033227_54959418032_o.webp",
    "evening-in-venus-1033379_54960495963_o.webp",
    "evening-on-the-moon-1033208_54960553189_o.webp",
    "evening-over-lunar-alps-g127-1033250_54960611315_o.webp",
    "fine-weather-picton-harbour-nz-o96-1033334_54960491933_o.webp",
    "full-moon-g107-1033388_54959432457_o.webp",
    "full-moon-um4-1033280_54960560074_o.webp",
    "full-sail-in-the-twilight-o110-1033330_54960618615_o.webp",
    "giant-sun-spot-g45-1033261_54960311666_o.webp",
    "giant-sun-storms-g46-1033262_54960558034_o.webp",
    "great-ruler-of-an-immortal-cosmos-give-me-truth-1033304_54960616290_o.webp",
    "group-of-atoms-g28-1033268_54960558709_o.webp",
    "hen-u74-1033184_54960551429_o.webp",
    "horse-drawn-cart-with-luggage-1033437_54960573029_o.webp",
    "house-amongst-plants-1033457_54960327706_o.webp",
    "house-in-paddock-with-surrounding-bush-1033468_54959438592_o.webp",
    "how-radium-writes-its-autograph-c35a-1033327_54960564544_o.webp",
    "how-the-sun-affects-the-earth-g66-1033224_54959417812_o.webp",
    "hut-o53-1033344_54960619940_o.webp",
    "hut-point-antartica-u54a-1033177_54959413992_o.webp",
    "hymn-glory-to-thee-my-god-1033398_54960497118_o.webp",
    "hymn-o-god-our-help-in-ages-past-1033399_54960497233_o.webp",
    "hymn-sun-of-my-soul-1033397_54959432982_o.webp",
    "in-monoceros-u32-1033290_54960615255_o.webp",
    "in-te-domine-speravi-c155-1033374_54960321831_o.webp",
    "innbrium-sea-g118-1033236_54960609740_o.webp",
    "instellation-cygnus-u24-1033301_54960561929_o.webp",
    "jupiter-g131-1033365_54959430952_o.webp",
    "jupiter-g132-1033366_54960622060_o.webp",
    "kismet-and-shoemaker-darjeeling-1033443_54960627440_o.webp",
    "kismet-and-shoemaker-darjeeling-1033444_54959436547_o.webp",
    "lake-rotomahana-1033470_54960575624_o.webp",
    "landscape---countryside-and-sea-1033472_54960575654_o.webp",
    "landscape--church-and-houses-in-background-1033460_54960501943_o.webp",
    "landscape-beach-and-cliff-1033476_54959439147_o.webp",
    "landscape-bush-and-stream-1033474_54960502978_o.webp",
    "landscape-moonlight-off-hastings-1033419_54959434342_o.webp",
    "landscape-o26-1033351_54959429442_o.webp",
    "landscape-palms-and-trees-1033454_54960628320_o.webp",
    "landscape-palms-and-trees-1033456_54959437692_o.webp",
    "landscape-trees-and-plams-1033438_54960627085_o.webp",
    "learn-to-distinguish-between-the-absolute-and-the-relative-u44-1033306_54959425327_o.webp",
    "lightening-g17-1033251_54960557144_o.webp",
    "lightening-g4-1033248_54960611155_o.webp",
    "lunar-alps-before-sunset-fiji-1033494_54960504648_o.webp",
    "lunar-apennines-1033520_54960579979_o.webp",
    "lunar-apennines-and-archimedes-eh-109-1033219_54960481148_o.webp",
    "lunar-apennines-g114-1033239_54959418947_o.webp",
    "lunar-apennines-u115-1033203_54960479858_o.webp",
    "lunar-craters-compared-with-area-of-england-1033490_54960577124_o.webp",
    "lunar-landscape-21-1033497_54960330971_o.webp",
    "lunar-landscape-prior-to-present-form-of-lunar-crates-1033500_54960578034_o.webp",
    "lunar-landscape-sunset-in-moon-1033503_54960331571_o.webp",
    "lunar-libration-1033324_54960317231_o.webp",
    "lunar-snow-apennines---sudden-white-deposit--by-pickering-and-christie-g115-1033382_54960623195_o.webp",
    "lunar-surface-138-1033411_54960571249_o.webp",
    "man-standing-in-driveway-leading-to-house-1033461_54960628770_o.webp",
    "map-of-terrestrial-volcanic-surface-g124-1033362_54960621765_o.webp",
    "mare-serenitatis-u17a-1033302_54960562024_o.webp",
    "men-playing-quoits-1033479_54960576239_o.webp",
    "men-washing-boat-deck-1033481_54960630390_o.webp",
    "micrococcus-tetragenus-u42-1033308_54960489373_o.webp",
    "milky-way-13th-october1893-lick-observatory-u41-1033205_54959416307_o.webp",
    "milky-way-around-cygni-1894-1033432_54960325911_o.webp",
    "milky-way-lick-observatory-1033194_54960552129_o.webp",
    "monsoonal-ligtening-queensland-o112-1033329_54960564689_o.webp",
    "moon-1033389_54959432522_o.webp",
    "moon-1033392_54960496853_o.webp",
    "moon-1033393_54960496903_o.webp",
    "moon-1033406_54960624815_o.webp",
    "moon-1033407_54960498013_o.webp",
    "moon-1033427_54960499253_o.webp",
    "moon-1033433_54960326061_o.webp",
    "moon-1033436_54960626875_o.webp",
    "moon-1033484_54960503818_o.webp",
    "moon-1033486_54960576854_o.webp",
    "moon-1033487_54959440132_o.webp",
    "moon-1033513_54960506403_o.webp",
    "moon-22nd-september-1890-lick-observatory-1033491_54959440467_o.webp",
    "moon-abt-8-days-1033502_54960632130_o.webp",
    "moon-age-12d-65h-lick-observation-ras-26-1033511_54960579029_o.webp",
    "moon-age-8d-1h-lunar-alps-1897-1033510_54959442207_o.webp",
    "moon-apennines-vegetation-g116-1033235_54960609660_o.webp",
    "moon-appenines-yerkes-1033504_54959441647_o.webp",
    "moon-as-seen-in-northern-hemisphere-from-proctor-1033429_54959435067_o.webp",
    "moon-at-11-days-adam-ballarat-f120-1033493_54960330551_o.webp",
    "moon-at-1st-quarter-rutherford-c116-1033516_54960332766_o.webp",
    "moon-at-last-quarter-rutherford-c125-1033514_54960633175_o.webp",
    "moon-ballaarat-1033515_54960332706_o.webp",
    "moon-caucasus-mountains-1033525_54960580374_o.webp",
    "moon-copernicus-g123-1033361_54960567839_o.webp",
    "moon-copernicus-kepler-aristarelius-1033512_54960579144_o.webp",
    "moon-drawing-moon-from-drawing-by-jycho-brake-1033527_54960507618_o.webp",
    "moon-eclipse-of-the-sun-by-the-earth-as-seen-from-the-moon-1033243_54959419362_o.webp",
    "moon-eruption-cm14-1033325_54960564299_o.webp",
    "moon-eruption-g120-1033360_54960494478_o.webp",
    "moon-evening-apennines-g113-1033240_54960309471_o.webp",
    "moon-g102-1033222_54960481398_o.webp",
    "moon-g103-1033223_54960481518_o.webp",
    "moon-july-1910-per-adam-ballaarat-1033430_54960499483_o.webp",
    "moon-mare-nubium-1033498_54960631860_o.webp",
    "moon-mare-nubium-1896-29th-september-16h-pmt-1033496_54960577684_o.webp",
    "moon-mare-nubium-yerkes-1033508_54959442072_o.webp",
    "moon-meeting-of-mountain-ranges-1033501_54960578104_o.webp",
    "moon-mercator-1033326_54960317466_o.webp",
    "moon-per-adam-ballaarat-july-1910-1033528_54960580554_o.webp",
    "moon-region-south-of-mare-nubium-yerkes-ras-92-1033509_54960332231_o.webp",
    "moon-surface--1033424_54960499003_o.webp",
    "moon-surface-1033485_54959439957_o.webp",
    "moon-surface-1894-1033505_54960632475_o.webp",
    "moon-surface-aristotle-1033492_54960330446_o.webp",
    "moon-surface-cassini-and-plinius-1033390_54960569694_o.webp",
    "moon-surface-coude-equiatorial-where-mountain-ranges-meet-1033431_54960626445_o.webp",
    "moon-surface-e-h-126-1033321_54960316871_o.webp",
    "moon-surface-mercator-and-campanus-v115-1033197_54960606545_o.webp",
    "moon-surface-u112-1033181_54960478263_o.webp",
    "moon-theophilus-and-c-sunset-on-sea-of-nectar-yerkes-observatory-1033495_54960577554_o.webp",
    "moon-um15-1033273_54960486208_o.webp",
    "moon-um2-1033283_54960560359_o.webp",
    "moon-um5-1033278_54960313406_o.webp",
    "moons-surface-bouillard-ptolomy-copernicus-1033404_54960497738_o.webp",
    "moons-surface-lalande-copernicus-kepler-1033405_54960570919_o.webp",
    "mount-everest-g3-1033247_54960556794_o.webp",
    "mount-tauranga-1033458_54960327801_o.webp",
    "mount-wellington-o35-1033359_54959430537_o.webp",
    "mt-blanc-from-the-air-o26a-1033350_54960493248_o.webp",
    "nebulosities-surrounding-the-pleiades-g147-1033371_54960622385_o.webp",
    "niagara-falls-o70-1033343_54960492673_o.webp",
    "observatory-mt-wellington-tasmania-1033346_54960319221_o.webp",
    "on-meridian-below-pole-u8a-1033277_54960486733_o.webp",
    "panning-for-gold-o101-1033332_54960618875_o.webp",
    "partial-eclipse-of-the-sun-g87-1033234_54960555354_o.webp",
    "peel-isle-of-man-august-1901-1033354_54960493743_o.webp",
    "phases-of-the-eclipse-phases-of-the-moon-1033517_54960633525_o.webp",
    "planet-1033202_54960306461_o.webp",
    "planet-1033323_54960317136_o.webp",
    "planet-g128-1033364_54960321166_o.webp",
    "planet-u59-1033319_54960563534_o.webp",
    "planets-u55-1033175_54960550509_o.webp",
    "planetsr62-1033210_54960307081_o.webp",
    "plant-and-butterfly-u36-1033313_54959426027_o.webp",
    "plato-pico-and-valley-of-the-alps-g119-1033237_54960482538_o.webp",
    "plato-soon-after-sunrise-1033499_54960631915_o.webp",
    "poem-god-is-alls-well-1033403_54959433447_o.webp",
    "queensland-coast-g2a-1033241_54959419152_o.webp",
    "racing-shorting-review-o103-1033331_54960564884_o.webp",
    "radium-lecture-53a-1033212_54960480713_o.webp",
    "radium-lecture-no-0-1033209_54960306971_o.webp",
    "rangitoto-eruption-g57-1033242_54960610375_o.webp",
    "rawhiti-in-auckland-harbour-1033466_54960575259_o.webp",
    "rill-system-g17-5109-1033253_54959420362_o.webp",
    "rugby-match-auckland-vs-taranaki-1904-1033463_54960574994_o.webp",
    "saturn-from-satellite-1033200_54960306316_o.webp",
    "saturn-g134-1033367_54960495168_o.webp",
    "seascape-land-in-background-1033420_54960571694_o.webp",
    "seascape-yacht-with-land-in-background-1033462_54960628860_o.webp",
    "seascape-yacht-with-land-in-background-1033477_54960329116_o.webp",
    "see-the-wonderful-rays-of-radium-invercargill-9th-november-1917-1033401_54960497423_o.webp",
    "sheep-1033478_54960329186_o.webp",
    "sheep-darling-downs-o99-1033333_54960565124_o.webp",
    "ship-moored-at-kawau-island-1033464_54960575079_o.webp",
    "shipwreck-o88-1033337_54960318656_o.webp",
    "side-profile-of-man-suffering-from-varioloid-syphillis-1033441_54960500448_o.webp",
    "side-profile-of-man-suffering-from-varioloid-syphillis-1033465_54960575154_o.webp",
    "snow-in-rear-of-antarctic-disturbance-o94-104a-1033335_54960318491_o.webp",
    "snow-lunar-apennines-1033199_54960552484_o.webp",
    "snow-sw-of-lunar-apennines-1033435_54960572834_o.webp",
    "solar-explosions-bombarding-earth-g76-1033228_54960554829_o.webp",
    "solar-explosions-g74-1033226_54960608925_o.webp",
    "solar-explosions-g79-1033229_54960609135_o.webp",
    "south-polar-mountains-moon-g108-1033385_54959432357_o.webp",
    "south-polar-stars-g29-1033269_54960312416_o.webp",
    "south-pole-of-moon-25000-ft-g110-1033384_54960623325_o.webp",
    "spiders-1033206_54959416352_o.webp",
    "spiral-nebular-g6-1033249_54960556959_o.webp",
    "stars-g30-1033270_54959421892_o.webp",
    "stars-painted-1033198_54959415762_o.webp",
    "steamboat-mountains-in-background-ben-nevis-o27-1033349_54960319491_o.webp",
    "still-life-with-apples-g82-1033232_54960609400_o.webp",
    "still-life-with-flowers-g70-1033225_54960608795_o.webp",
    "sun-bombarding-earth-u61a-1033316_54960563354_o.webp",
    "sun-eruption-1033196_54960606480_o.webp",
    "sun-g36-1033256_54960484543_o.webp",
    "sun-photosphere-g37-1033257_54959420687_o.webp",
    "sun-u61u47-1033317_54960316451_o.webp",
    "sun-u64-1033315_54960490018_o.webp",
    "sunrise-on-sea-of-plenty-1033386_54960322601_o.webp",
    "sunrise-rangitoto-nz-o3-1033356_54959430122_o.webp",
    "sunset-g2-1033245_54959419657_o.webp",
    "sunset-on-the-mare-crisium-1033489_54959440202_o.webp",
    "sunspot-central-1033259_54960311466_o.webp",
    "sunspot-u70-1033188_54960551749_o.webp",
    "sunspots-u67-1033192_54960305641_o.webp",
    "sunspots-v66-1033193_54960606335_o.webp",
    "surface-of-moon-triesnecker-1033529_54960634290_o.webp",
    "surface-of-the-moon-hale-1033422_54960325081_o.webp",
    "surfaces-of-the-moon-1033391_54960496778_o.webp",
    "telescope-g100-1033221_54960307841_o.webp",
    "telescope-g34-1033376_54960321981_o.webp",
    "telescope-u59a-1033320_54960617600_o.webp",
    "telescope-um3-1033281_54960313631_o.webp",
    "text-ages-ago-the-equator-g54-1033265_54960485308_o.webp",
    "text-the-suns-maximum-means-earthquakes-g81-1033231_54959418362_o.webp",
    "text-u19-1033299_54960615925_o.webp",
    "text-u2a-1033282_54960614615_o.webp",
    "text-u35-1033289_54960615115_o.webp",
    "text-u37-1033180_54960605230_o.webp",
    "text-u38-1033310_54960489593_o.webp",
    "text-u39-1033207_54960480113_o.webp",
    "text-u57-1033173_54960545344_o.webp",
    "text-waiata-8th-january-1922-1033286_54959423582_o.webp",
    "text-waiata-january-1922-u54c-1033176_54960304221_o.webp",
    "text-we-shall-see-later-how-the-sun-affects-our-earth-and-the-seasons-g49a-1033264_54960612640_o.webp",
    "text86-1033216_54960607940_o.webp",
    "text92-1033217_54960307531_o.webp",
    "text98-1033215_54960607880_o.webp",
    "the-awful-endless-space-g21-depths-of-space-1033252_54960484093_o.webp",
    "the-endless-universe-and-eternal-life-u1-1033287_54960615025_o.webp",
    "the-grandeur-of-the-universe-g1-1033244_54960610720_o.webp",
    "the-grandeur-of-the-universe-putaruru-4th-september-1922-1033402_54960323621_o.webp",
    "the-hut-ben-nevis-observatory-031-1033348_54959429077_o.webp",
    "the-midnight-sermon-in-the-observatory-1st-june-1914-u31-1033291_54960488013_o.webp",
    "the-original-barometer-ben-nevis-observatory-o29-1033357_54960621220_o.webp",
    "the-story-of-the-sun-g31-1033272_54960559099_o.webp",
    "the-sun-as-seen-from-the-planets-1033380_54960322231_o.webp",
    "the-sun-its-influence-on-the-earth-and-the-seasons-1033285_54960487448_o.webp",
    "the-sun-waiata-3rd-august-1922-u48-1033179_54960550834_o.webp",
    "there-is-no-religion-higher-than-truth-1033381_54960569169_o.webp",
    "there-is-no-religion-higher-than-truth-u45a-1033305_54960489178_o.webp",
    "tilt-of-planet-g43-1033260_54960484763_o.webp",
    "tilt-of-the-earth-g53-1033266_54959421482_o.webp",
    "total-eclipse-1893-g85-1033238_54960482648_o.webp",
    "total-eclipse-u73-1033185_54960478578_o.webp",
    "triesnecker-and-accompanying-cracks-1033506_54960331906_o.webp",
    "triesnecker-and-accompanying-cracks-1033507_54960505893_o.webp",
    "v69-1033189_54960605960_o.webp",
    "venus1897eh-102-1033218_54960481058_o.webp",
    "views-of-lunar-eclipse-1033518_54959442927_o.webp",
    "waiata-tropical-gardens-1033439_54959436087_o.webp",
    "waiata-tropical-gardens-1033442_54960500558_o.webp",
    "waterfall-o87-1033338_54960565759_o.webp",
    "wave-shapes-g80-1033230_54959418292_o.webp",
    "waves-breaking-over-embankment-during-storm-rio-de-janeiro-1033355_54960493848_o.webp",
    "who-am-i-who-are-you-u37a-1033311_54960562974_o.webp",
    "wilkies-pools-mt-egmont-1033412_54959434142_o.webp",
    "with-scott-to-antartica-u52-1033178_54960304436_o.webp",
    "woman-in-field-with-cattle-and-turkeys-1033480_54960503503_o.webp",
    "yoked-cattle-1033469_54959438692_o.webp",
    "young-girl-standing-amongst-palms-1033455_54959437607_o.webp",
  ];

  /**
   * Parses a magic lantern filename to extract a clean title and metadata
   */
  function parseFilename(filename) {
    // Remove extension
    let base = filename.replace(/\.webp$/i, "");

    // Extract PDR number if present (7-digit number before underscore)
    const pdrMatch = base.match(/-(\d{7})_/);
    const pdrNum = pdrMatch ? pdrMatch[1] : "";

    // Extract custom code if present (e.g. u46, g7, um4, o30, c155)
    const codeMatch = base.match(/-([a-z]{1,2}\d{1,3})-/i);
    const code = codeMatch ? codeMatch[1].toUpperCase() : "";

    // Clean up the name part by removing the PDR number, the code, and everything after
    let namePart = base;
    if (pdrMatch) {
      namePart = base.substring(0, pdrMatch.index);
    }
    // Remove trailing code
    namePart = namePart.replace(/-[a-z]{1,2}\d{1,3}$/i, "");

    // Replace hyphens and underscores with spaces
    let title = namePart.replace(/[-_]+/g, " ").trim();

    // Title Case formatting
    title = title
      .split(" ")
      .map((word) => {
        if (word.toLowerCase() === "nz") return "NZ";
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");

    let meta = `PDR Slide${pdrNum ? ` #${pdrNum}` : ""}${code ? ` | Code: ${code}` : ""}`;

    // Override descriptions for key narrative slides to maintain historical accuracy
    if (pdrNum === "1033304") {
      meta =
        "PDR Slide #1033304 | Inscription: 'Great ruler of an immortal cosmos, give me truth.'";
    } else if (pdrNum === "1033200") {
      meta =
        "PDR Slide #1033200 | Inscription: 'Saturn from satellite local.' Hand-painted celestial perspective.";
    } else if (pdrNum === "1033421") {
      meta =
        "PDR Slide #1033421 | Detail of the lunar surface craters and mountain ridges.";
    } else if (pdrNum === "1033190") {
      meta =
        "PDR Slide #1033190 | Inscription: 'Dust shoals from the sun bombarding the earth.'";
    } else if (pdrNum === "1033329") {
      meta =
        "PDR Slide #1033329 | Rare photograph capturing storm electricity in Queensland, Australia.";
    } else if (pdrNum === "1033185") {
      meta =
        "PDR Slide #1033185 | Corona of the Sun during a total solar eclipse, late 19th century.";
    } else if (pdrNum === "1033327") {
      meta =
        "PDR Slide #1033327 | Inscription: 'How radium writes its autograph.' Illustrating radiant particles.";
    } else if (pdrNum === "1033446") {
      meta =
        "PDR Slide #1033446 | Clement Lindley Wragge standing in his tropical garden haven in Auckland.";
    } else if (pdrNum === "1033287") {
      meta =
        "PDR Slide #1033287 | Magic lantern lecture title slide demonstrating theosophical concepts.";
    } else if (pdrNum === "1033381") {
      meta =
        "PDR Slide #1033381 | Inscription expressing the fundamental motto of theosophy.";
    }

    return { title, meta };
  }

  /**
   * Opens the lightbox mode for any arbitrary slide in the 300+ image archive
   */
  function openArchiveLightbox(filename) {
    const parsed = parseFilename(filename);

    lightboxImg.src = `imageAssets/magicLanterns/${filename}`;
    lightboxImg.alt = parsed.title;
    lightboxTitle.textContent = parsed.title;
    lightboxDesc.textContent = parsed.meta;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  /**
   * Dynamically render the archive grid catalog on load
   */
  function renderArchiveGrid() {
    const archiveGrid = document.querySelector(".archive-grid");
    if (!archiveGrid) return;

    // Clear static elements
    archiveGrid.innerHTML = "";

    // References:
    // - MDN DocumentFragment: https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
    // - W3Schools Document CreateDocumentFragment(): https://www.w3schools.com/jsref/met_document_createdocumentfragment.asp
    const fragment = document.createDocumentFragment();

    magicLanternsImages.forEach((filename, idx) => {
      const parsed = parseFilename(filename);

      const button = document.createElement("button");
      button.className = "archive-grid-item";
      button.setAttribute("data-image-filename", filename);
      button.setAttribute("aria-label", `Inspect Slide: ${parsed.title}`);

      const thumb = document.createElement("div");
      thumb.className = "grid-item-thumbnail";

      const img = document.createElement("img");
      img.src = `imageAssets/magicLanterns/${filename}`;
      img.alt = parsed.title;
      // References:
      // - MDN Lazy Loading: https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading
      // - W3Schools HTML img loading Attribute: https://www.w3schools.com/tags/att_img_loading.asp
      img.loading = "lazy"; // Dynamic lazy loading for fast page speeds

      thumb.appendChild(img);
      button.appendChild(thumb);

      // Click to trigger lightbox
      button.addEventListener("click", () => {
        openArchiveLightbox(filename);
      });

      fragment.appendChild(button);
    });

    archiveGrid.appendChild(fragment);
  }

  // Initialize dynamic grid
  renderArchiveGrid();

  // Close lightbox on pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
});
