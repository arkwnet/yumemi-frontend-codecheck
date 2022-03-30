import { it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import PrefectureList from "../components/PrefectureList.vue";
import { sleep } from "./utils";

const props = {
  prefectures: [
    { prefName: "Alpha", prefCode: 1 },
    { prefName: "Bravo", prefCode: 2 },
    { prefName: "Charlie", prefCode: 3 },
  ],
};
const wrapper = mount(PrefectureList, { props: props });

// コンポーネントを描画
it("Draw component", async () => {
  expect(wrapper.exists()).toBe(true);
  expect(wrapper.classes()).toContain("checkbox");
});

// ダミーのJSONデータ（実際はRESAS APIレスポンス）から複数のチェックボックスを生成
it("Generate multiple checkbox from json", async () => {
  await wrapper.setProps(props);
  let checkbox = [];
  for (let i = 0; i < props.prefectures.length; i++) {
    // チェックボックスのテスト
    checkbox.push(wrapper.find("#prefCheck" + props.prefectures[i].prefCode));
    expect(checkbox[i].exists()).toBe(true);
    checkbox[i].setValue(true);
    expect(wrapper.vm.$data.selectedPrefecture).toEqual([
      props.prefectures[i].prefCode,
    ]);
    // ラベルのテスト
    const label = wrapper.find("#prefLabel" + props.prefectures[i].prefCode);
    expect(label.text()).toEqual(props.prefectures[i].prefName);
  }

  // 複数チェックのテスト
  await sleep(1000);
  checkbox[0].setValue(false);
  checkbox[1].setValue(true);
  checkbox[2].setValue(true);
  await sleep(1000);
  expect(wrapper.vm.$data.selectedPrefecture).toEqual(
    expect.arrayContaining([2, 3])
  );
});
