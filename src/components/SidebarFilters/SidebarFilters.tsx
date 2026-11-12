import { useEffect } from "react";
import { api } from "../../api/ApiClient";
import { isResponseSpecialization } from "../../types/Specialization";
import { useFilterStore } from "../../store/filterStore";

export default function () {
  const filterStore = useFilterStore();

  useEffect(() => {
    async function get() {
      const specs = await api.getSpecializations();
      if (!isResponseSpecialization(specs)) return;

      const skills = await api.getSkills();

      console.log(specs, skills);
    }

    get();
  }, []);

  return (
    <div>
      <input />
      <fieldset>
        <legend>Специализация</legend>
      </fieldset>

      <fieldset>
        <legend>Навыки</legend>
      </fieldset>

      <fieldset>
        <legend>Уровень сложности</legend>
      </fieldset>

      <fieldset>
        <legend>Рейтинг</legend>
      </fieldset>

      <fieldset>
        <legend>Статус</legend>
      </fieldset>
    </div>
  );
}
