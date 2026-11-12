import { useEffect, useState } from "react";
import { api } from "../../api/ApiClient";
import {
  isResponseSpecialization,
  type Specialization,
} from "../../types/Specialization";
import { useFilterStore } from "../../store/filterStore";
import { isResponseSkill, type Skill } from "../../types/Skill";
import styles from "./SidebarFilters.module.css";

const DIFFICULTIES = [
  {
    title: "1-3",
    value: [1, 2, 3],
  },
  {
    title: "4-6",
    value: [4, 5, 6],
  },
  {
    title: "7-8",
    value: [7, 8],
  },
  {
    title: "9,10",
    value: [9, 10],
  },
];

const RATINGS = [1, 2, 3, 4, 5];

export default function () {
  const filterStore = useFilterStore();

  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    async function get() {
      const newSpecs = await api.getSpecializations();
      if (!isResponseSpecialization(newSpecs)) return;

      const newSkills = await api.getSkills();
      if (!isResponseSkill(newSkills)) return;

      setSpecializations(newSpecs.data);
      setSkills(newSkills.data);
    }

    get();
  }, []);

  return (
    <section className={styles.container}>
      <input />
      <fieldset>
        <legend>Специализация</legend>
        {specializations.map((item) => (
          <label key={`specialization-${item.id}`}>
            <input type="radio" />
            {item.title}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Навыки</legend>
        {skills.map((item) => (
          <label key={`skill-${item.id}`}>
            <input type="checkbox" />
            <img loading="lazy" src={item.imageSrc} alt=" " />
            {item.title}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Уровень сложности</legend>
        {DIFFICULTIES.map((item) => (
          <label key={`difficulty-${item.title}`}>
            <input type="checkbox" />
            {item.title}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Рейтинг</legend>
        {RATINGS.map((item) => (
          <label key={`rating-${item}`}>
            <input type="checkbox" />
            {item}
          </label>
        ))}
      </fieldset>
    </section>
  );
}
