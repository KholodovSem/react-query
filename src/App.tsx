import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from './state/react-query-instance';
import Layout from './components/Layout';
import HomePage from './components/Home.page';
import SuperHeroesPage from './components/SuperHeroes.page';
import RQSuperHeroesPage from './components/RQSuperHeroes.page';
import RQSuperHeroPage from './components/RQSuperHero.page';
import ParalllelQueries from './components/ParallelQueries.page';
import DependentQueriesPage from './components/DependentQueriesPage';
import PaginatedQueriesPage from './components/PaginatedQueries.page';
import { InfiniteQueriesPage } from './components/InfiniteQueries.page';

/* 
    React Query - A library for fetching data in a React application

    * Start with: 
    1) import QueryClientProvider and wrapped it all you app
    2) import QueryClient and create new instance of that
    3) QueryClientPovider need client props (it's our instance of QueryClient) give it them

    * RQ Devtools 
    If you need devtools, please import component ReactQueryDevtools from "react-query/devtools"
    and paste it in your code.

    * Query Cache
    По умолчанию результат запроса кешируется на 5-минут. 
    Это поведение можно изменить как глобально, так и локально.

    * Stale Time
    Время за которое данные полученные с сервера, будут считаться свежими.
    И запрос за ними в фоне делаться не будет.
    По умолчанию 0.

    * Refetch
    - refetchOnMount - Делать ли повторный запрос при маунте компонента, который подписан на обновления.
    - refetchOnWindowFocus - Делать ли повторный запрос при потере и восстановлении фокуса окна.

    * Polling 
    Получение данных через регулярный промежуток времени.
    Осуществляется через ключ refetchInterval - миллисекунды.
    По умолчанию - отключен.
    !Не работает в фоновом режиме. Для этого есть ключ refetchIntervalInBackground - (true or false)

    * По умолчанию используя хук useQuery запрос делается сразу же при маунте компонента.
    Изменить это поведения можно, изменив ключ enabled - (true on default).

    * Побочные действия 
    Иногда нам может понадобиться совершить какие-либо побочные действия после успешного или
    неуспешного выполнения запроса.
    Для этого есть ключи: onSuccess & onError, которые принимают колл-беки.

    * Преобразование данных
    Компоненту не всегда нужна вся информация приходящая с бек-энда.
    Для того чтобы произвести трансформацию данных, мы можем воспользоваться ключем
    "select", который принимает колл-бек, в качестве аргумента ему приходят все данные.
    А то что мы из него вернём и будет в конечном результате возращенно из хука useQuery.

    * Собственный переиспользуемый хук, пример:
    interface SelectedHeroes {
      id: number;
      name: string;
    }

    * Сделать запрос недействительным
    После того, как мы воспользовались хуком useMutation, мы хотим чтобы данные 
    обновились автоматически.
    Для этого, нам понадобится инстанс queryClient (вызвать его можно с помощью хука useQueryClient).
    У инстанса вызываем метод invalidateQueries("queryKey")

    * Изменить кэш ручками
    Для того чтобы не делать запрос на получение свежего списка, 
    мы можем сами добавить в кеш, вернувшиеся значение.
    
    * Prefetch
    Мы можем предварительно выгрузить данные в кэш, для того чтобы избежать ненужной загрузки и достигнуть 
    лучшего пользователького опыта.
    Для этого мы можем воспользоваться методом queryClient - prefetchQuery()
    Он похож на хук useQuery, потому что требует те же настройки.
    
    

    Для этого нам снова понадобится инстанс queryClient (вызвать его можно с помощью хука useQueryClient).
    У него вызываем метод setQueryData("queryKey", (oldData) => ...) - возращаемое значение станет новой датой в
    кэше.

    const useHeroName = (queryKey: string) => {
      const { ...rest } = useQuery<Hero[], AxiosError, SelectedHeroes[]>({
        queryKey: queryKey,
        select: data => {
          return data.map(hero => {
            return {
              id: hero.id,
              name: hero.name,
            };
          });
        },
      });

    return rest;
    };

    * Initial Query Data
    Для того чтобы установить начальное значение в хуке useQuery, мы можем использовать ключ:
    "initialData". (Они будут заменены, как только закончить фоновая загрузка свежих данных)
    Если мы предварительно загружали все данные, они находятся в кеше.
    Чтобы туда достучаться, мы можем получить инстанс queryClient с помощью хука useQueryClient.
    А там есть метод useQueryData() - который принимает строку "queryKey", по ней он нам вернёт
    выгруженные данные, которые находяться в кеше.
*/

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/super-heroes" element={<SuperHeroesPage />} />
          <Route path="parallel" element={<ParalllelQueries />} />
          <Route path="pagination" element={<PaginatedQueriesPage />} />
          <Route path="infinite" element={<InfiniteQueriesPage />} />
          <Route
            path="dependent"
            element={<DependentQueriesPage email="vishwas@example.com" />}
          />
          <Route path="/rq-super-heroes">
            <Route index element={<RQSuperHeroesPage />} />
            <Route path=":heroId" element={<RQSuperHeroPage />} />
          </Route>
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;
