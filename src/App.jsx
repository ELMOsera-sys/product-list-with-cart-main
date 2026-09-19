import RenderDessertCard from "./template/dessertCard.jsx";
import RenderPreview from "./template/preview/preview.jsx";
import RenderConfirmation from "./template/confirmation/confirmation.jsx";
import { DataProvider , DataContext} from "./template/CounterContext.jsx";
import { useContext } from "react";

function AppContent() {
  const { data, increment, decrement, totalItems, totalPrice, setConfirmation, confirmation } = useContext(DataContext);

  return (
    <main className="font-sans bg-rose-50 flex flex-col items-center gap-10 py-10 px-4 text-rose-900 relative md:flex-row">
      <section className="option-section flex flex-col gap-6 md:w-[70%]">
        <h1 className="font-bold text-5xl">Desserts</h1>
        <div className="options-wrapper flex flex-col gap-10 md:grid md:grid-cols-3 md:grid-rows-auto">
          {data?.map((item) => (
            <RenderDessertCard
              key={item.id}
              {...item}
              increment={increment}
              decrement={decrement}
            />
          ))}
        </div>
      </section>
      <RenderPreview
       totalItems={totalItems}
       totalPrice={totalPrice}
       decrement={decrement}
       setConfirmation={setConfirmation}
       data={data} />


      {confirmation && (
        <>
        <div className="overlay fixed inset-0 md:bg-black/50 z-30"></div>
      <RenderConfirmation
       data={data}
       totalPrice={totalPrice}
       setConfirmation={setConfirmation}
        />
        </>
      )}
    </main>
  );
}

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

export default App;
