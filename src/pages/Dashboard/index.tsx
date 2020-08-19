import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [maxId, setMaxId] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      await api.get('/foods').then(response => {
        setFoods(response.data);
        setMaxId(response.data.length);
      });
    }

    loadFoods();
  }, []);

  async function handleAddFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const { name, image, price, description } = food;
      console.log(maxId);
      await api
        .post('/foods', {
          id: maxId + 1,
          name,
          image,
          price,
          description,
          available: true,
        })
        .then(response => {
          const allFoods = [...foods, response.data];
          setFoods(allFoods);
          setMaxId(allFoods.length);
        });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    const { name, description, price, image } = food;
    const { id, available } = editingFood;

    await api
      .put<IFoodPlate>(`/foods/${id}`, {
        id,
        name,
        description,
        price,
        image,
        available,
      })
      .then(response => {
        const updatedFoods = foods.map(foodToBeFound => {
          if (foodToBeFound.id === id) {
            Object.assign(foodToBeFound, response.data);
          }
          return foodToBeFound;
        });

        setFoods(updatedFoods);
      });
  }

  async function handleDeleteFood(id: number): Promise<void> {
    await api.delete(`/foods/${id}`).then(() => {
      const foodsAfterDelete = foods.filter(food => food.id !== id);
      setFoods(foodsAfterDelete);
      setMaxId(foods.length + 1);
    });
  }

  async function handleUpdateAvailable(food: IFoodPlate): Promise<void> {
    await api.put(`/foods/${food.id}`, food).then(response => {
      const updatedFoods = foods.map(foodToBeFound => {
        if (foodToBeFound.id === food.id) {
          Object.assign(foodToBeFound, response.data);
        }
        return foodToBeFound;
      });

      setFoods(updatedFoods);
    });
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    setEditingFood(food);
    toggleEditModal();
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleUpdateAvailable={handleUpdateAvailable}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
