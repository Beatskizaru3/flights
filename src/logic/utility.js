window.onload = () => {
  const roundTrip = document.querySelector('input[value="roundTrip"]');
  const oneWay = document.querySelector('input[value="oneWay"]');

  oneWay.checked = false;
  roundTrip.checked = true;
};

const accordionItem = document.querySelector(".filter-item");
const accordionHeader = document.querySelector(".filter-header");
const accordionBtn = document.querySelector(".filter-button");
const accordionCollapse = document.querySelector(".filter-collapse");
const accordionBody = document.querySelector(".filter-body");

if (window.innerWidth < 992) {
  accordionItem.classList.add("accordion-item");
  accordionHeader.classList.add("accordion-header");
  accordionBtn.classList.add("accordion-button");
  accordionCollapse.classList.add("accordion-collapse", "collapse", "show");
  accordionBody.classList.add("accordion-body");
} else {
  accordionItem.classList.remove("accordion-item");
  accordionHeader.classList.remove("accordion-header");
  accordionBtn.classList.remove("accordion-button");
  accordionCollapse.classList.remove("accordion-collapse", "collapse", "show");
}

window.addEventListener("resize", (e) => {
  let results = document.querySelector(".results");
  let rowsNames = document.querySelector(".rows-names");
  let flightCards = document.querySelectorAll(".flight-card");
  if (e.target.innerWidth < 992) {
    accordionItem.classList.add("accordion-item");
    accordionHeader.classList.add("accordion-header");
    accordionBtn.classList.add("accordion-button");
    accordionCollapse.classList.add("accordion-collapse", "collapse", "show");
    accordionBody.classList.add("accordion-body");
    results.classList.remove("col-9");
    if (rowsNames.classList.contains("row-cols-5")) {
      rowsNames.classList.remove("row-cols-5");
    }
    if (rowsNames.classList.contains("row-cols-4")) {
      rowsNames.classList.remove("row-cols-4");
    }
    if (!rowsNames.classList.contains("row-cols-6")) {
      rowsNames.classList.add("row-cols-6");
    }
    flightCards.forEach((el) => {
      el.classList.remove("row-cols-5");
      el.classList.add("row-cols-6");
    });

    if (e.target.innerWidth < 768) {
      if (rowsNames.classList.contains("row-cols-6")) {
        rowsNames.classList.remove("row-cols-6");
      }
      if (!rowsNames.classList.contains("row-cols-5")) {
        rowsNames.classList.add("row-cols-5");
      }

      flightCards.forEach((el) => {
        el.classList.remove("row-cols-6");
        el.classList.add("row-cols-5");
      });

      if (e.target.innerWidth < 425) {
        if (rowsNames.classList.contains("row-cols-6")) {
          rowsNames.classList.remove("row-cols-6");
        }
        if (rowsNames.classList.contains("row-cols-5")) {
          rowsNames.classList.remove("row-cols-5");
        }
        if (!rowsNames.classList.contains("row-cols-4")) {
          rowsNames.classList.add("row-cols-4");
        }

        flightCards.forEach((el) => {
          el.classList.remove("row-cols-6");
          el.classList.remove("row-cols-5");
          el.classList.add("row-cols-4");
        });
      }
    }
  } else {
    accordionItem.classList.remove("accordion-item");
    accordionHeader.classList.remove("accordion-header");
    accordionBtn.classList.remove("accordion-button");
    accordionCollapse.classList.remove(
      "accordion-collapse",
      "collapse",
      "show"
    );
    accordionBody.classList.remove("accordion-body");
    results.classList.add("col-9");
  }
});
