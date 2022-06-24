import { CalculatorDetails } from "@/components/calculator/CalculatorDetails";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { CalculatorResult } from "@/components/calculator/CalculatorResult";
import { CalculatorRoot } from "@/components/calculator/CalculatorRoot";
import { CalculatorTitle } from "@/components/calculator/CalculatorTitle";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { useState } from "react";

const CalcPage = () => {
  const [critRate, setCritRate] = useState(NaN);
  const [critDmg, setCritDmg] = useState(NaN);
  const critValue = critDmg + critRate * 2;

  return (
    <Layout
      title="Calculators"
      description="Genshin Impact calculators for crti value, resin and etc."
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <CalculatorRoot>
              <CalculatorTitle>Crit Value</CalculatorTitle>
              <CalculatorDetails>Provide your stats details</CalculatorDetails>
              <CalculatorInput
                setValue={setCritRate}
                step={0.1}
                placeholder="Artifact's crit rate"
              />
              <CalculatorInput
                setValue={setCritDmg}
                step={0.1}
                placeholder="Artifact's crit damage"
              />

              {critRate > 0 && critDmg > 0 && (
                <CalculatorResult>
                  Crit Value is <span className="text-primary-500 font-semibold">{critValue}</span>
                </CalculatorResult>
              )}
            </CalculatorRoot>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default CalcPage;
