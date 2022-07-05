import dayjs from "dayjs";
import { useState } from "react";

import { CalculatorDetails } from "@/components/calculator/CalculatorDetails";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { CalculatorResult } from "@/components/calculator/CalculatorResult";
import { CalculatorRoot } from "@/components/calculator/CalculatorRoot";
import { CalculatorTitle } from "@/components/calculator/CalculatorTitle";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";

const CalcPage = () => {
  const [critRate, setCritRate] = useState(NaN);
  const [critDmg, setCritDmg] = useState(NaN);
  const critValue = critDmg + critRate * 2;

  const [resinCurrent, setResinCurrent] = useState(NaN);
  const [resinNeeded, setResinNeeded] = useState(NaN);
  const resinDelta = (resinNeeded - resinCurrent) * 8;
  const resinReplenishAt = dayjs().add(resinDelta, `minutes`);

  return (
    <Layout
      title="Calculators"
      description="Genshin Impact calculators for crti value, resin and etc."
    >
      <Container>
        <div className="columns-1 md:columns-2 gap-4 space-y-4">
          <CalculatorRoot className="overflow-y-auto break-inside-avoid">
            <CalculatorTitle>Crit Value</CalculatorTitle>
            <CalculatorDetails>Provide your stats details</CalculatorDetails>
            <CalculatorInput setValue={setCritRate} step={0.1} placeholder="Artifact's crit rate" />
            <CalculatorInput
              setValue={setCritDmg}
              step={0.1}
              placeholder="Artifact's crit damage"
            />

            {critRate > 0 && critDmg > 0 && (
              <CalculatorResult>
                Crit Value is{` `}
                <span className="text-primary-500 dark:text-primary-400 font-semibold">
                  {critValue}
                </span>
              </CalculatorResult>
            )}
          </CalculatorRoot>

          <CalculatorRoot className="overflow-y-auto break-inside-avoid">
            <CalculatorTitle>Resin</CalculatorTitle>
            <CalculatorDetails>Find out when you&apos;ll be able to farm</CalculatorDetails>
            <CalculatorInput setValue={setResinCurrent} placeholder="How much resin you have" />
            <CalculatorInput setValue={setResinNeeded} placeholder="How much resin you need" />

            {resinDelta > 0 && (
              <CalculatorResult>
                You will have{` `}
                <span className="text-primary-500 dark:text-primary-400 font-semibold">
                  {resinNeeded}
                </span>
                {` `}
                at{` `}
                <span className="text-primary-500 dark:text-primary-400 font-semibold">
                  {resinReplenishAt.format(`lll`)}
                </span>
              </CalculatorResult>
            )}
          </CalculatorRoot>
        </div>
      </Container>
    </Layout>
  );
};

export default CalcPage;
