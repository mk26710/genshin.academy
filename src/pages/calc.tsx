import type { FunctionComponent } from "react";

import { useAtom } from "jotai";
import useTranslation from "next-translate/useTranslation";

import {
  critDamageAtom,
  critRateAtom,
  critValueAtom,
  resinCurrentAtom,
  resinNeededAtom,
  resinReplenishTimeAtom,
  resinTimeDeltaAtom,
} from "@/atoms/calculator";
import { CalculatorDetails } from "@/components/calculator/CalculatorDetails";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { CalculatorRoot } from "@/components/calculator/CalculatorRoot";
import { CalculatorTitle } from "@/components/calculator/CalculatorTitle";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";

const CritValueResult = ({ critValue }: { critValue: number }) => {
  const color = () => {
    if (critValue > 50) {
      return "text-emerald-300";
    } else if (critValue > 40) {
      return "text-emerald-500";
    } else if (critValue > 30) {
      return "text-emerald-900";
    } else if (critValue > 20) {
      return "text-yellow-600";
    } else if (critValue > 10) {
      return "text-yellow-300";
    }

    return "text-red-700";
  };

  return (
    <>
      <span className={color()}>{critValue.toFixed(2)}</span>
    </>
  );
};

const CrtitValueCalculator: FunctionComponent = () => {
  const { t } = useTranslation();

  const [critRate, setCritRate] = useAtom(critRateAtom);
  const [critDmg, setCritDmg] = useAtom(critDamageAtom);
  const [critValue] = useAtom(critValueAtom);

  return (
    <CalculatorRoot className="overflow-y-auto break-inside-avoid">
      <CalculatorTitle>
        <span className="flex-1">{t`calc:crit-value`}</span>
        {critValue > 0 && <CritValueResult critValue={critValue} />}
      </CalculatorTitle>
      <CalculatorDetails>{t`calc:cv-details`}</CalculatorDetails>
      <CalculatorInput
        value={critRate}
        setValue={setCritRate}
        step={0.1}
        placeholder={t`calc:cv-cr-placeholder`}
      />
      <CalculatorInput
        value={critDmg}
        setValue={setCritDmg}
        step={0.1}
        placeholder={t`calc:cv-cd-placeholder`}
        className="mt-2"
      />
    </CalculatorRoot>
  );
};

const ResinCalculator: FunctionComponent = () => {
  const { t } = useTranslation();

  const [resinCurrent, setResinCurrent] = useAtom(resinCurrentAtom);
  const [resinNeeded, setResinNeeded] = useAtom(resinNeededAtom);
  const [resinDelta] = useAtom(resinTimeDeltaAtom);
  const [resinReplenishTime] = useAtom(resinReplenishTimeAtom);

  return (
    <CalculatorRoot className="overflow-y-auto break-inside-avoid">
      <CalculatorTitle className="!flex-col lg:!flex-row">
        <span className="flex-1">{t`calc:resin`}</span>
        {resinDelta > 0 && (
          <span className="text-primary-500 normal-case">{resinReplenishTime.format("lll")}</span>
        )}
      </CalculatorTitle>
      <CalculatorDetails>{t`calc:resin-details`}</CalculatorDetails>
      <CalculatorInput
        value={resinCurrent}
        setValue={setResinCurrent}
        placeholder={t`calc:resin-current-placeholder`}
      />
      <CalculatorInput
        value={resinNeeded}
        setValue={setResinNeeded}
        placeholder={t`calc:resin-needed-placeholder`}
        className="mt-2"
      />
    </CalculatorRoot>
  );
};

const CalcPage = () => {
  const { t } = useTranslation();

  return (
    <Layout title={t("common:calculators")} description={t("meta:calculators.description")}>
      <Container>
        <div className="columns-1 md:columns-2 gap-4 space-y-4">
          <CrtitValueCalculator />
          <ResinCalculator />
        </div>
      </Container>
    </Layout>
  );
};

export default CalcPage;
