import type { HeadersFunction, MetaFunction } from "@remix-run/node";

import { Main } from "~/components/Main";
import { generateMeta } from "~/utils/meta-generator";

export const meta: MetaFunction = () => {
  return generateMeta({
    title: "About",
    noIndex: true,
  });
};

export const headers: HeadersFunction = () => ({
  "X-Robots-Tag": "noindex",
});

const WALLETS = [
  ["BCH", "qrelh4lam4rrt6peqzxypl7jllceyhc6es2dpvxw42"],
  ["BTC", "bc1qhj5c4m46wg5cru7q27vlun7f8t60uqwps7tgqg"],
  ["ETH", "0x07fD794C0a70FE2D2C887F4ae37d83F28B7BE484"],
];

export default function About() {
  const copyToClipboard = async (s: string) => {
    await navigator.clipboard.writeText(s);
    alert(`Copied to clipboard:\n${s}`);
  };

  return (
    <Main>
      <Main.Container
        display="flex"
        flex={1}
        direction="col"
        className="items-center justify-center"
      >
        <div className="flex max-w-xl flex-col rounded-box border-gray-300 bg-white px-4 py-5 shadow sm:p-6">
          <h3 className="text-lg font-semibold">genshin.academy</h3>
          <p className="text-justify">
            This website was brought to you by{" "}
            <a href="https://github.com/TenkoSpirit" className="underline underline-offset-2">
              TenkoSpirit
            </a>
            , an open-source development enthusiast! The "academy" project serves as a small Genshin
            Impact database and as guides resources with some tools and is written in React.js using
            Remix.js framework.
          </p>
          <p className="mt-2">The source-code can be found on my GitHub!</p>
          <h3 className="mt-6 text-lg font-semibold">Support the project</h3>
          <p className="mb-4">
            I run this website absolutely for free and for now ad-free as well, so if you'd like to
            support me and the project, you can do that by using these cryptocurrencies:
          </p>

          <table className="border-collapse self-center  rounded-box border border-gray-300">
            <tbody>
              {WALLETS.map(([coin, addr]) => (
                <tr key={coin} className="font-mono">
                  <td className="border border-gray-300 px-2">{coin}</td>
                  <td
                    className="cursor-pointer break-all border border-gray-300 px-2"
                    onClick={() => copyToClipboard(addr)}
                  >
                    {addr}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Main.Container>
    </Main>
  );
}
