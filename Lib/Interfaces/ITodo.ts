/**
 * Interface représentant une todo à faire
 */
export interface ITodo {
  /**
   * Identifiant de la todo
   */
  id: string;

  /**
   * Identifiant de la liste à laquelle la todo appartient
   */
  listId: string;

  /**
   * Date de création de la todo
   */
  date: Date;

  /**
   * Titre de la todo
   */
  // title: string;

  /**
   * Description de la todo
   */
  description: string;

  /**
   * Status de la todo
   */
  completed: boolean;
}
