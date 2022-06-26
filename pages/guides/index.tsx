import { type ChangeEvent, useEffect, useRef } from "react";
import { NextPage } from "next";
import { debounce, isEmpty } from "lodash-es";

import { Layout } from "@/components/Layout";
import { GuideCard } from "@/components/cards/GuideCard";
import { Container } from "@/components/Container";

import { charactersArray } from "@/data/characters";
import published from "@/data/guides/compiled/characters/published.json";
import { useRouter } from "next/router";

// this doesn't need to be reactive
const publishedCharacters = charactersArray.filter(({ id }) => published.includes(id));

const RouterReadyContent = () => {
  const router = useRouter();

  const input = useRef<HTMLInputElement>(null);
  const query = router.query.q?.toString() ?? "";

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    router.replace(`/guides?q=${e.target.value}`, undefined, { shallow: true });
  }, 300);

  useEffect(() => {
    const el = input.current;
    if (el == null) {
      return;
    }

    if (isEmpty(el.value) && !isEmpty(query)) {
      el.value = query;
    }
  }, [query]);

  if (!router.isReady) {
    return null;
  }

  return (
    <>
      <input
        ref={input}
        type="text"
        placeholder="Search by title"
        onChange={handleChange}
        className="w-full mb-4 lg:mb-8 leading-6 dark:text-neutral-300 placeholder:text-neutral-600 accent-primary-500 rounded-md ring-1 bg-white dark:bg-neutral-800 ring-neutral-900/10 dark:ring-neutral-50/10 shadow-sm py-1.5 pl-2 pr-3"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {publishedCharacters.map((character) => (
          <GuideCard
            key={character.id}
            id={character.id}
            href={`/guides/${character.id}`}
            title={character.name}
            description={character.description}
            thumbnail={`/img/characters/${character.id}/avatar_header.webp`}
            className={!character.name.toLowerCase().includes(query.toLowerCase()) ? "!hidden" : ""}
          />
        ))}
      </div>
    </>
  );
};

const GuidesIndex: NextPage = () => {
  const r = useRouter();
  useEffect(() => {
    console.log(r.query);
  }, []);

  return (
    <Layout title="Guides" description="Genshin Impact characters' playstyle, builds and etc.">
      <Container>
        <RouterReadyContent />
      </Container>
    </Layout>
  );
};

GuidesIndex.getInitialProps = async (context) => {
  return {};
};

export default GuidesIndex;
