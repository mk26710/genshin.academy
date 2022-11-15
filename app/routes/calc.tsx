import type { MetaFunction } from "@remix-run/node";
import type { FunctionComponent } from "react";
import type { RouteHandle } from "~/types/common";

import { useAtom } from "jotai";
import { useLocale, useTranslations } from "use-intl";

import {
  critDamageAtom,
  critRateAtom,
  critValueAtom,
  resinCurrentAtom,
  resinNeededAtom,
  resinReplenishTimeAtom,
  resinTimeDeltaAtom,
} from "~/atoms/calculator";
import { CalculatorDetails } from "~/components/calculator/CalculatorDetails";
import { CalculatorInput } from "~/components/calculator/CalculatorInput";
import { CalculatorRoot } from "~/components/calculator/CalculatorRoot";
import { CalculatorTitle } from "~/components/calculator/CalculatorTitle";
import { Container } from "~/components/Container";

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
  const t = useTranslations();

  const [critRate, setCritRate] = useAtom(critRateAtom);
  const [critDmg, setCritDmg] = useAtom(critDamageAtom);
  const [critValue] = useAtom(critValueAtom);

  return (
    <CalculatorRoot className="break-inside-avoid overflow-y-auto">
      <CalculatorTitle>
        <span className="flex-1">{t(`calc.crit-value`)}</span>
        {critValue > 0 && <CritValueResult critValue={critValue} />}
      </CalculatorTitle>
      <CalculatorDetails>{t(`calc.cv-details`)}</CalculatorDetails>
      <CalculatorInput
        value={critRate}
        setValue={setCritRate}
        step={0.1}
        placeholder={t(`calc.cv-cr-placeholder`)}
      />
      <CalculatorInput
        value={critDmg}
        setValue={setCritDmg}
        step={0.1}
        placeholder={t(`calc.cv-cd-placeholder`)}
        className="mt-2"
      />
    </CalculatorRoot>
  );
};

const ResinCalculator: FunctionComponent = () => {
  const t = useTranslations();
  const locale = useLocale();

  const [resinCurrent, setResinCurrent] = useAtom(resinCurrentAtom);
  const [resinNeeded, setResinNeeded] = useAtom(resinNeededAtom);
  const [resinDelta] = useAtom(resinTimeDeltaAtom);
  const [resinReplenishTime] = useAtom(resinReplenishTimeAtom);

  return (
    <CalculatorRoot className="break-inside-avoid overflow-y-auto">
      <CalculatorTitle className="!flex-col lg:!flex-row">
        <span className="flex-1">{t(`calc.resin`)}</span>
        {resinDelta > 0 && (
          <span className="normal-case text-primary-500">
            {resinReplenishTime.toLocaleString(locale)}
          </span>
        )}
      </CalculatorTitle>
      <CalculatorDetails>{t(`calc.resin-details`)}</CalculatorDetails>

      <CalculatorInput
        value={resinCurrent}
        setValue={setResinCurrent}
        placeholder={t(`calc.resin-current-placeholder`)}
      />
      <CalculatorInput
        value={resinNeeded}
        setValue={setResinNeeded}
        placeholder={t(`calc.resin-needed-placeholder`)}
        className="mt-2"
      />
    </CalculatorRoot>
  );
};

export const handle: RouteHandle = {
  id: "calc",
  withScrollRestoration: true,
};

export const meta: MetaFunction = () => ({
  title: "Calculators - GENSHIN.ACADEMY",
});

const CalcPage = () => {
  return (
    <Container>
      <div className="columns-1 gap-4 space-y-4 md:columns-2">
        <CrtitValueCalculator />
        <ResinCalculator />
      </div>
    </Container>
  );
};

export default CalcPage;
