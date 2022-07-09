import type { CharacterType } from "@/data/character";
import type { NextPage } from "next";
import type { ChangeEvent } from "react";

import { debounce, isEmpty } from "lodash-es";
import { useEffect, useRef } from "react";

import { GuideCard } from "@/components/cards/GuideCard";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { charactersArray } from "@/data/characters";
import published from "@/data/guides/compiled/published.json";
import { useRouterReady } from "@/hooks/useRouterReady";

type PublishedItem = typeof published[0];

// this doesn't need to be reactive
const publishedGuides = published.reduce((acc, item) => {
  const character = charactersArray.find((c) => c.id === item.id);
  if (character != null) {
    acc.push({ meta: item, character });
  }
  return acc;
}, new Array<{ meta: PublishedItem; character: CharacterType }>());

const GuidesIndex: NextPage = () => {
  const [ready, router] = useRouterReady();

  const inputRef = useRef<HTMLInputElement>(null);
  const q = router.query.q?.toString() ?? ``;

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const url = !isEmpty(e.target.value) ? `/guides?q=${e.target.value}` : `/guides`;
    void router.replace(url, undefined, { shallow: true });
  }, 300);

  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.value = q;
    }
  }, [ready, q]);

  return (
    <Layout title="Guides" description="Genshin Impact characters' playstyle, builds and etc.">
      <Container>
        {ready && (
          <>
            <Input ref={inputRef} placeholder="Search by title" onChange={handleChange} fullWidth />

            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4 space-y-4">
              {publishedGuides
                .filter((g) => g.character.name.includes(q.toString().toLowerCase()))
                .map((guide) => (
                  <GuideCard
                    key={guide.character.id}
                    id={guide.character.id}
                    href={`/guides/${guide.meta.id}`}
                    title={guide.character.name}
                    description={guide.character.description}
                    thumbnail={`/img/characters/${guide.character.id}/avatar_header.webp`}
                  />
                ))}
            </div>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default GuidesIndex;
