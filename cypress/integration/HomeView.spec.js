// https://docs.cypress.io/api/introduction/api.html

const prefectureCount = 47;

describe("Integrated Testing", () => {
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
    while (count <= 5) {
      const random = Math.floor(Math.random() * prefectureCount) + 1;
      if (clickList.indexOf(random) == -1) {
        clickList.push(random);
        count++;
      }
    }
    for (let i = 0; i < 5; i++) {
      cy.get("#prefCheck" + clickList[i]).click();
    }
    // 処理が進むまで少し待つ
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    // グラフ凡例に都道府県名が表示されているか?
    for (let i = 0; i < 5; i++) {
      cy.get(".highcharts-legend-item text")
        .eq(i)
        .contains(/(都|道|府|県)$/);
    }
  });
});
