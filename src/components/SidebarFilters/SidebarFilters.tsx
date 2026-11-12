import { useEffect, useRef, useState, type ChangeEvent } from "react";
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

      setSpecializations(newSpecs.data);
    }

    get();
  }, []);

  useEffect(() => {
    async function get() {
      const newSkills = await api.getSkills(
        undefined,
        undefined,
        filterStore.specialization,
      );
      if (!isResponseSkill(newSkills)) return;
      setSkills(newSkills.data);
    }

    get();
  }, [filterStore.specialization]);

  const handleSelectSpecialization = (specializationId: number) => {
    if (filterStore.specialization !== specializationId)
      filterStore.handleSetSpecialization(specializationId);
    else if (filterStore.specialization === specializationId)
      filterStore.handleSetSpecialization(null);
  };

  const handleSelectMultipleValue = (
    key: "skills" | "difficulty" | "rating",
    ...value: number[]
  ) => {
    filterStore.handleToggleMultipleValue(key, ...value);
  };

  const debTimerSearchQuery = useRef<number>(null);

  const handleChangeSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    if (debTimerSearchQuery.current !== null) {
      clearTimeout(debTimerSearchQuery.current);
    }

    debTimerSearchQuery.current = setTimeout(() => {
      filterStore.handleSetSearchQuery(event.target.value);
    }, 500);
  };

  return (
    <section className={styles.container}>
      <input
        type="text"
        onChange={handleChangeSearchQuery}
        className={styles.searchQuery}
        placeholder="Введите запрос..."
      />
      <fieldset className={styles.fieldsetContainer}>
        <legend>Специализация</legend>
        {specializations.map((item) => (
          <label key={`specialization-${item.id}`} className={styles.tagButton}>
            <input
              name="specialization"
              type="radio"
              readOnly
              checked={filterStore.specialization === item.id}
              onClick={() => handleSelectSpecialization(item.id)}
            />
            {item.title}
          </label>
        ))}
      </fieldset>

      <fieldset className={styles.fieldsetContainer}>
        <legend>Навыки</legend>
        {skills.map((item) => (
          <label key={`skill-${item.id}`} className={styles.tagButton}>
            <input
              type="checkbox"
              onChange={() => {
                handleSelectMultipleValue("skills", item.id);
              }}
              checked={filterStore.skills.includes(item.id)}
            />
            {item.imageSrc && <img loading="lazy" src={item.imageSrc} alt="" />}
            {item.title}
          </label>
        ))}
      </fieldset>

      <fieldset className={styles.fieldsetContainer}>
        <legend>Уровень сложности</legend>
        {DIFFICULTIES.map((item) => (
          <label key={`difficulty-${item.title}`} className={styles.tagButton}>
            <input
              type="checkbox"
              onChange={() => {
                handleSelectMultipleValue("difficulty", ...item.value);
              }}
              checked={item.value.every((val) =>
                filterStore.difficulty.includes(val),
              )}
            />
            {item.title}
          </label>
        ))}
      </fieldset>

      <fieldset className={styles.fieldsetContainer}>
        <legend>Рейтинг</legend>
        {RATINGS.map((item) => (
          <label key={`rating-${item}`} className={styles.tagButton}>
            <input
              type="checkbox"
              onChange={() => {
                handleSelectMultipleValue("rating", item);
              }}
              checked={filterStore.rating.includes(item)}
            />
            {item}
          </label>
        ))}
      </fieldset>
    </section>
  );
}
