// https://docs.cypress.io/api/introduction/api.html

const prefectureCount = 47;

describe("Integrated Test", () => {
  // ユーザインタフェースを描画
  it("Draw user interface", () => {
    cy.visit("/");
    cy.get(".header h1").should("have.text", "yumemi-frontend-codecheck");
    cy.get(".checkbox h1").should("have.text", "都道府県");
    // 全都道府県のチェックボックスに対しテストを実行
    for (let i = 1; i <= prefectureCount; i++) {
      // チェックボックスが表示されているか?
      cy.get("#prefCheck" + i).should("be.visible");
      // ラベルに都道府県名が表示されているか?
      cy.get("#prefLabel" + i).contains(/(都|道|府|県)$/);
    }
  });

  // 5つのチェックボックスをランダムに選択しグラフを描画
  it("Select five prefecture checkboxes and check chart", () => {
    cy.visit("/");
    let count = 0;
    let clickList = [];
    const testCount = 5;
    while (count <= testCount) {
      const random = Math.floor(Math.random() * prefectureCount) + 1;
      if (clickList.indexOf(random) == -1) {
        clickList.push(random);
        count++;
      }
    }
    for (let i = 0; i < testCount; i++) {
      cy.get("#prefCheck" + clickList[i]).click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100);
    }
    // 処理が進むまで少し待つ
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    // グラフ凡例に都道府県名が表示されているか?
    for (let i = 0; i < testCount; i++) {
      cy.get(".highcharts-legend-item text")
        .eq(i)
        .contains(/(都|道|府|県)$/);
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100);
    }
  });

  // 何もチェックされていない時はグラフを非表示
  it("Hide chart if nothing is checked", () => {
    cy.visit("/");
    let count = 0;
    let clickList = [];
    const testCount = 3;
    // 3つの都道府県をランダムに選択
    while (count <= testCount) {
      const random = Math.floor(Math.random() * prefectureCount) + 1;
      if (clickList.indexOf(random) == -1) {
        clickList.push(random);
        count++;
      }
    }
    // チェックを入れる
    for (let i = 0; i < testCount; i++) {
      cy.get("#prefCheck" + clickList[i]).click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100);
    }
    // チェックを外す
    for (let i = 0; i < testCount; i++) {
      cy.get("#prefCheck" + clickList[i]).click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100);
    }
    // グラフが消えているか確認
    cy.get(".chart").should("not.exist");
  });
});
