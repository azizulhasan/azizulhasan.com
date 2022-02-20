  /**
   * Add another skill
   */
   const addSkill = () => {
    const icon_col = document.getElementById("skill_col");
    const icon_row = document
      .getElementById("skill_col")
      .firstChild.cloneNode(true);
    icon_col.appendChild(icon_row);
  };

  /**
   * Delete skill
   */
  const deleteSkill = (e) => {
    let row = e.target.parentElement.parentElement;
    e.target.parentElement.parentElement.parentElement.removeChild(row);
  };
  // Create table headers consisting of 4 columns.
  const STORY_HEADERS = [
    {
      prop: "profession",
      title: "Profession",
    },
    {
      prop: "portfolioImage",
      title: "Portfolio Image",
    },
    {
      prop: "details",
      title: "Details",
    },
  ];
  module.exports = {
    STORY_HEADERS,
    deleteSkill,
    addSkill
  };
  