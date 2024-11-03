import React, { useContext } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { CatalogContext } from '../data/CatalogProvider'

const Block = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

const Regards = styled.div`
  margin: 0 auto;
  width: max-content;
`

const HomeWrap = styled.div`
  & > h2 {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;

    &:before,
    &:after {
      content: '';
      border-top: 2px solid rgba(255, 218, 91, 0.83);
      margin: 0 20px 0 0;
      flex: 1 0 20px;
    }

    &:after {
        margin: 0 0 0 20px;
    }
  }
`

const categoryCount = (sheets, categories) => {
  return sheets.reduce((count, sheet) => {
    return categories.every(cat => sheet.categories.includes(cat)) ? count + 1 : count
  }, 0)
}

const Home = () => {

  const { sheets } = useContext(CatalogContext)

  return (
    <HomeWrap>
      <h2>Приветствуем вас в нашей библиотеке!</h2>
      <Block>
        <p>
          На нашем сайте представлено:<br/>
          &nbsp;&nbsp;<b>{categoryCount(sheets, ["балалайка", "фортепиано"])}</b> произведений для балалайки и фортепиано,<br/>
          &nbsp;&nbsp;<b>{categoryCount(sheets, ["балалайка", "соло"])}</b> произведений для балалайки соло,<br/>
          &nbsp;&nbsp;<b>{categoryCount(sheets, ["сборник"])}</b> сборников,<br/>
          а так-же этюды, сборники упражнений и ансамблевые произведения!<br/>
        </p>
        <p>
          {/* В разделе <Link to="/masters">Мастера России</Link> собраны контактные данные мастеров, обязательно загляните туда! */}
          Ждем ваших отзывов в <a href="https://vk.com/dilibrary" target="_blank" rel="noreferrer">нашей группе ВКонтакте</a>!
        </p>
        <p>
          Напоминаем, что информация размещенная на нашем сайте, предназначена только для ознакомления! Любое коммерческое использование нотного материала запрещено!
        </p>
      </Block>
      <h2>Уважаемые правообладатели!</h2>
      <Block>
        <p>
          Если у вас возникли претензии к размещению на данном сайте материалов, являющиеся объектами Ваших авторских или смежных прав,
          напишите пожалуйста письмо на электронный адрес: <a href="mailto:dilibrary@yandex.ru">dilibrary@yandex.ru</a><br/>
          Мы незамедлительно удалим Ваши материалы!
        </p>
      </Block>
      <h2>Благодарности!</h2>
      <Block>
        <p>
          Выражаем сердечную благодарность композиторам и правообладателям, давшим  согласие на размещение в библиотеке нот своих произведений:
        </p>
        <Regards>
          <b>Аверин</b> Владимир Александрович,<br />
          <b>Амосов</b> Андрей Николаевич,<br />
          <b>Белоруков</b> Андрей Львович,<br />
          <b>Броннер</b> Михаил Борисович,<br />
          <b>Васильева</b> Ольга Александровна,<br />
          <b>Гагалаян</b> Леон Владимирович<br />
          <b>Гуревич</b> Андрей Алексеевич,<br />
          <b>Данилов</b> Александр Степанович,<br />
          <b>Желинский</b> Евгений Вячеславович,<br />
          <b>Ельчик</b> Валерий Анатольевич,<br />
          <b>Калинин</b> Дмитрий Анатольевич,<br />
          <b>Клепалов</b> Юрий Михайлович,<br />
          <b>Клепалов</b> Евгений Юрьевич,<br />
          <b>Ковалевич</b> Николай,<br />
          <b>Макарова</b> Вера Алексеевна,<br />
          <b>Марчаковский</b> Александр Иванович,<br />
          <b>Мурза</b> Александр Анатольевич,<br />
          <b>Пенюгин</b> Денис Андреевич,<br />
          <b>Петров</b> Евгений Викторович,<br />
          <b>Садальский</b> Вадим Романович,<br />
          <b>Сущевский</b> Генадий Иванович,<br />
          <b>Тремасов</b> Александр Сергеевич,<br />
          <b>Урбанович</b> Владимир Георгиевич,<br />
          <b>Шелепов</b> Вадим Валерьевич.<br />
        </Regards>
      </Block>
    </HomeWrap>
  )
}

export default Home
