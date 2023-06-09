import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8.18", (api) => {

  const links = [
      // FontAwesome icons may need to be added in the site settings if they don't correctly appear
      { title: "Users Map", src: "/u/user-map", icon: "map" }
  ]

  $(document).ready(function () {
      if (document.getElementById("toggle-hamburger-menu")) {
          // We're in mobile view
          addToggleListener(document.getElementById("toggle-hamburger-menu"))
      } else {
          // We're in desktop view
          addToggleListener(document.getElementsByClassName("btn-sidebar-toggle")[0])
          addCustomLinks()
      }

      function addToggleListener(toggleEl) {
          if (toggleEl) {
             toggleEl.addEventListener("click", function () {
                 // Wait a bit for the sidebar to load
                 setTimeout(function() {
                     let sidebar = document.getElementsByClassName("sidebar-section-header").length
                     if (sidebar) {
                          addCustomLinks()
                      }
                  }, 100)
              })
          }
      }
    
      function addCustomLinks() {
          // Wait a bit until navigation has been loaded
          setTimeout(function () {
              const parentEl = document.getElementsByClassName("sidebar-section-content")[0]
              let linksAlreadyAdded = document.getElementsByClassName("sidebar-section-custom-link").length
        
              if (parentEl && !linksAlreadyAdded) {
                  links.filter(function (link) {
                      let linkDiv = document.createElement("li")
                      let linkTitleTrim = link.title.replace(/\s+/g, '')
                      linkDiv.className = "sidebar-section-link-wrapper sidebar-section-custom-link"
                      linkDiv.innerHTML = `<a href="${link.src}" class="sidebar-section-link sidebar-section-link-everything sidebar-row ember-view">
                            <span class="sidebar-section-link-prefix icon" id="link_${linkTitleTrim}"></span>
                            <span class="sidebar-section-link-content-text"> ${link.title} </span>
                        </a>
                      `
                      parentEl.append(linkDiv)
                    
                      let linkIcon = document.getElementById("link_" + linkTitleTrim)
                      if (linkIcon && link.icon) {
                          linkIcon.innerHTML = `<svg viewBox="0 0 640 512" class="fa d-icon svg-icon prefix-icon svg-string d-icon-${link.icon}" xmlns="http://www.w3.org/2000/svg">
                                  <use xlink:href="#${link.icon}"></use>
                              </svg>
                        `
                      }
                 })
              }
         }, 100)
      }
  });
});
